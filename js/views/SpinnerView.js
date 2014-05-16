/*global define */

define([
    'marionette',
    'templates'
], function(Marionette, templates) {
    'use strict';

    return Backbone.Marionette.ItemView.extend({
        template: templates.spinner
    });
});