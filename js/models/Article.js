/*global define */

define([
    'backbone',
    'WikiClient',
    'utils'
], function(Backbone, Wiki, utils) {
    'use strict';

    return Backbone.Model.extend({

        defaults: {
            pageID: -1,
            title: '',
            content: '',
            favorite: false,
            seen: false
        },

        loadContent: function() {
            var dfd = new $.Deferred();
            var content = this.get('content') || '';
            if (content) {
                dfd.resolve();
                return dfd.promise();
            }
            Wiki.loadArticle(this.get('pageID'))
                .then(_.bind(function(article) {
                    if (article) {
                        content = utils.getFirstParagraph(article);
                        this.save({
                            content: content
                        });
                    }
                    dfd.resolve();
                }, this));

            return dfd.promise();
        }

    });
});