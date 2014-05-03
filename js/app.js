/*global define */

define([
    'backbone',
    'marionette',
    'collections/Articles',
    'layouts/NavigationLayout',
    'views/ArticleView',
    'views/SpinnerView',
    'views/KbdView',
    'vent',
    'utils'
], function(Backbone, Marionette, Articles, NavigationLayout, ArticleView, SpinnerView, KbdView, vent, utils) {
    'use strict';

    var app = new Backbone.Marionette.Application();

    var articles = new Articles();
    app.addRegions({
        main: '#main',
    });

    // Show spinner while we connect the tubes
    app.main.show(new SpinnerView());

    app.addInitializer(function() {
        new NavigationLayout({
            collection: articles
        }).render();
        new KbdView().render();
        $(document).on('keydown', utils.handleKeyEvent);
    });

    // This doesn't feel right to me. 
    // This logic should probably go into another 'layout' type view.
    vent.on('article:show', function(id) {
        var article = articles.getOne(id);
        if (article) {
            app.main.show(new ArticleView({
                model: article
            }));
        }
    });
    return app;
});