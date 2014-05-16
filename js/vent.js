/*global define */

define([
    'backbone',
    'marionette',
], function(Backbone) {
    // Centralized 'vent' - prevents passing the 'app' object everywhere
    return new Backbone.Wreqr.EventAggregator();
});