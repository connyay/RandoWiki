/*global define */

define([
    'backbone',
    'vent',
    'models/Article',
    'localStorage',
    'WikiClient'
], function(Backbone, vent, Article, LocalStorage, Wiki) {
    'use strict';

    return Backbone.Collection.extend({

        localStorage: new LocalStorage('Articles'),
        inFlight: null,
        model: Article,

        initialize: function() {
            // Loads collection from storage
            this.fetch();
            vent.on('article:show', this.fetchOne, this);
        },

        seedRandom: function() {
            if (this.inFlight && this.inFlight.state() === "pending") {
                // Already fetching, bail.
                return this.inFlight.promise();
            }
            this.inFlight = new $.Deferred();
            Wiki.getRandomList()
                .then(_.bind(function(articles) {
                    _.each(articles, function(article) {
                        var model = new Article({
                            pageID: article.id,
                            title: article.title
                        });
                        this.add(model);
                        model.save();
                    }, this);

                    this.inFlight.resolve();
                }, this));

            return this.inFlight.promise();
        },

        fetchOne: function(id) {
            var dfd = new $.Deferred();
            var article;
            if (!id) {
                article = this._fetchOne();
                if (!article) {
                    this.seedRandom().then(_.bind(function() {
                        article = this._fetchOne();
                        this._articleLoaded(article, dfd);
                    }, this));
                    return dfd.promise();
                }
                this._articleLoaded(article, dfd);

            } else {
                article = this.get(id);
                if (!article) {
                    // This can occur if the user had an article in the url,
                    // cleared storage and then refreshed (f5) the page.
                    vent.trigger('router:reset');
                    dfd.reject();
                    return dfd.promise();
                }
                this._articleLoaded(article, dfd);
            }
            return dfd.promise();
        },

        _fetchOne: function() {
            var article = this.where({
                seen: false
            }).pop();
            if (!article) {
                return;
            }
            return article;
        },

        _articleLoaded: function(article, dfd) {
            article.save({
                seen: true
            });
            vent.trigger('article:loaded', article);
            if (dfd) {
                dfd.resolve(article);
            }
        }
    });
});