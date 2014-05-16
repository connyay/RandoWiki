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
        historyDropDownView: null,
        favoriteDropDownView: null,

        events: {
            'click #new-article-btn': 'showNewArticle',
            'click .navbar-brand': 'showNewArticle'
        },

        template: templates.nav,

        onRender: function(event) {
            this.historyDropDownView = this._createDropDownView('#history', 'History', {
                seen: true
            });
            this.favoriteDropDownView = this._createDropDownView('#favorites', 'Favorites', {
                favorite: true
            });
        },

        showNewArticle: function(event) {
            vent.trigger('article:show');
        },

        _createDropDownView: function(el, name, filter, collection) {
            var model = new Model({
                name: name,
                filter: filter
            });
            return new DropDownMenuView({
                el: el,
                model: model,
                collection: collection || this.collection
            }).render();
        }

    });
});