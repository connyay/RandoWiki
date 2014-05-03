/*global define */

define([
    'marionette',
    'templates',
    'vent'
], function(Marionette, templates, vent) {
    'use strict';

    return Backbone.Marionette.ItemView.extend({
        template: templates.article,

        events: {
            'click .favorite-btn': 'toggleFavorite'
        },

        toggleFavorite: function() {
            this.model.save({
                favorite: !this.model.get('favorite')
            });
            var icon = this.$('.favorite-btn > span');
            if (this.model.get('favorite')) {
                icon.removeClass('fa-star-o').addClass('fa-star');
            } else {
                icon.removeClass('fa-star').addClass('fa-star-o');
            }
        },

        onRender: function() {
            this.model.loadContent().then(_.bind(function(content) {
                this.showContent(content);
            }, this));
        },
        onShow: function() {
            // Connect article favorite keypress
            vent.on('article:favorite', this.toggleFavorite, this);
        },

        onClose: function() {
            // Disconnect article favorite keypress
            vent.off('article:favorite', this.toggleFavorite, this);
        },

        showContent: function(content) {
            // Shove in the content
            this.$('.content').html(content).slideDown();
            // Hide the loading text
            this.$('.loading').hide();
        }

    });
});