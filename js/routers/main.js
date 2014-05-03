/*global define */

define([
    'marionette',
    'vent'
], function(Marionette, vent) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({

        initialize: function() {
            vent.on('router:reset', function() {
                this.navigate('/');
            }, this);
        },

        appRoutes: {
            '': 'showArticle',
            'article/:id': 'showArticle'
        }
    });
});