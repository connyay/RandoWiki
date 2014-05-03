/*global define */

define(function(require) {
    'use strict';

    return {
        article: require('tpl!templates/article.html'),
        nav: require('tpl!templates/nav.html'),
        spinner: require('tpl!templates/spinner.html'),
        dropdownmenu: require('tpl!templates/dropdownmenu.html'),
        kbdhelp: require('tpl!templates/kbdhelp.html')
    };
});