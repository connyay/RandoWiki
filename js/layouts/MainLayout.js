/*global define */

define([
    'backbone',
    'marionette',
    'templates',
    'collections/Articles',
    'layouts/NavigationLayout',
    'views/SpinnerView',
    'views/KbdView',
    'views/ArticleView',
    'vent'
], function(Backbone, Marionette, templates, Articles, NavigationLayout, SpinnerView, KbdView, ArticleView, vent) {
    'use strict';

    var Model = Backbone.Model.extend({});

    return Marionette.Layout.extend({

        el: '#main',
        collection: null,
        navigation: null,
        template: templates.main,
        regions: {
            article: "#article",
            help: "#help"
        },

        initialize: function() {
            this.collection = new Articles();
            vent.on('article:loaded', this.showArticle, this);
        },

        onRender: function(event) {
            this.navigation = new NavigationLayout({
                collection: this.collection
            }).render();

            // Show spinner while we connect the tubes
            this.article.show(new SpinnerView());
            this.help.show(new KbdView());
        },

        showArticle: function(article) {
            this.article.show(new ArticleView({
                model: article
            }));
        }

    });
});