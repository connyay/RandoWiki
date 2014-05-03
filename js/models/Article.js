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
            var d = new $.Deferred();
            var content = this.get('content') || '';
            if (content) {
                d.resolve(content);
                return d;
            }
            Wiki.loadArticle(this.get('pageID'))
                .then(_.bind(function(article) {
                    if (article) {
                        content = utils.getFirstParagraph(article);
                        this.save({
                            content: content
                        });
                    }
                    d.resolve(content);
                }, this));

            return d;
        }

    });
});