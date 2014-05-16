/*global define */

define([
    'backbone',
    'marionette',
    'layouts/MainLayout',
    'utils'
], function(Backbone, Marionette, MainLayout, utils) {
    'use strict';

    var app = new Backbone.Marionette.Application();

    app.mainLayout = new MainLayout().render();

    app.addInitializer(function() {
        $(document).on('keydown', utils.handleKeyEvent);
    });

    return app;
});