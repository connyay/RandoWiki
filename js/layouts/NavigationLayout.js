/*global define */

define([
    'backbone',
    'marionette',
    'templates',
    'views/DropDownMenuView',
    'utils',
    'vent'
], function(Backbone, Marionette, templates, DropDownMenuView, utils, vent) {
    'use strict';

    var Model = Backbone.Model.extend({});

    return Marionette.Layout.extend({

        el: '#nav',

        collection: null,

        events: {
            'click #new-article-btn': 'showNewArticle',
            'click .navbar-brand': 'showNewArticle'
        },

        template: templates.nav,

        onRender: function(event) {
            var historyModel = new Model({
                name: 'History',
                filter: {
                    seen: true
                }
            });
            new DropDownMenuView({
                el: '#history',
                model: historyModel,
                collection: this.collection
            }).render();

            var favoritesModel = new Model({
                name: 'Favorites',
                filter: {
                    favorite: true
                }
            });
            new DropDownMenuView({
                el: '#favorites',
                model: favoritesModel,
                collection: this.collection
            }).render();
        },

        showNewArticle: function(event) {
            vent.trigger('article:show');
        }
    });
});