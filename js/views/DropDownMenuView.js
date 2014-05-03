/*global define */

define([
    'marionette',
    'templates',
    'virtualCollection',
    'views/DropDownItemView',
    'views/EmptyDropDownItemView'
], function(Marionette, templates, VirtualCollection, DropDownItemView, EmptyDropDownItemView) {
    'use strict';

    return Backbone.Marionette.CompositeView.extend({
        itemView: DropDownItemView,
        itemViewContainer: ".dropdown-menu",
        template: templates.dropdownmenu,
        emptyView: EmptyDropDownItemView,
        initialize: function() {
            this.collection = new VirtualCollection(this.collection, {
                filter: this.model.get('filter'),
                comparator: 'title'
            });
        },

        appendHtml: function(collectionView, itemView, index) {
            var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
            var children = childrenContainer.children();
            if (children.size() <= index) {
                childrenContainer.append(itemView.el);
            } else {
                children.eq(index).before(itemView.el);
            }
        }
    });
});