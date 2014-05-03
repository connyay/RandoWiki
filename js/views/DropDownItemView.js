/*global define */

define([
    'marionette',
    'templates'
], function(Marionette, templates) {
    'use strict';

    return Backbone.Marionette.ItemView.extend({
        tagName: "li",
        template: _.template('<a href="#article/<%= id %>"><%= title %></a>')
    });
});