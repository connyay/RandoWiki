/*global define */

define([
    'marionette',
    'templates'
], function(Marionette, templates) {
    'use strict';

    return Backbone.Marionette.ItemView.extend({
        tagName: 'li',
        className: 'dropdown-header',
        template: _.template('Nothing here...')
    });
});