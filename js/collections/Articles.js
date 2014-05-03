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
        initialLoad: 10,

        initialize: function() {
            this.fetch().then(_.bind(function() {
                if (!this.models.length) {
                    this.initRandom();
                }
            }, this));
        },

        initRandom: function() {
            if (this.inFlight) {
                // Already fetching, bail.
                return;
            }
            this.inFlight = true;
            Wiki.getRandomList({
                limit: this.initialLoad,
                ns: 0
            }).then(_.bind(function(articles) {
                _.each(articles, function(article) {
                    var model = new Article({
                        pageID: article.id,
                        title: article.title
                    });
                    this.add(model);
                    model.save();
                }, this);
                vent.trigger('article:show');
                this.inFlight = false;
            }, this));
        },

        getOne: function(id) {
            var article;
            if (!id) {
                article = this.where({
                    seen: false
                }).pop();
                if (!article) {
                    this.initRandom();
                    return;
                }
                article.save({
                    seen: true
                });
            } else {
                article = this.get(id);
                if (!article) {
                    // This can occur if the user had an article in the url,
                    // cleared storage and then refreshed (f5) the page.
                    vent.trigger('router:reset');
                    return;
                }
            }
            return article;
        }
    });
});