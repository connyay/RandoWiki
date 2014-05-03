/*global define */

define([
    'vent'
], function(vent) {
    'use strict';

    return {
        showArticle: function(id) {
            vent.trigger('article:show', id || '');
        }
    };
});