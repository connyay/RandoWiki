require.config({
    paths: {
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
        jquery: '../bower_components/jquery/jquery',
        localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        virtualCollection: '../bower_components/backbone-virtual-collection/backbone.virtual-collection',
        tpl: 'lib/tpl',
        bootstrap: 'lib/bootstrap',
        chai: 'lib/chai'
    },

    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require([
    'app',
    'backbone',
    'routers/main',
    'controllers/main',
    'bootstrap'
], function(app, Backbone, Router, Controller) {
    'use strict';
    app.start();

    app.router = new Router({
        controller: Controller
    });

    Backbone.history.start();
});