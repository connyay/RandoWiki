define(['vent'], function(vent) {

    return {
        getFirstParagraph: function(article) {
            var $content = $(article.extract);
            if (this._isDisambiguationArticle(article)) {
                // Disambiguation articles are fairly pointless for this
                // application, but we should still display the entire content
                return $content.text();
            }
            // This is very ugly, but gets the job done.
            // I was using .filter('p:first') but was unrelable and
            // matched '<p></p>' enough to be annoying
            var firstParagraph = $content.filter('p').not(':empty').first().text();
            if (firstParagraph) {
                return firstParagraph;
            }
            // We tried our best, but this one slipped through the cracks
            return $content.text();
        },

        handleKeyEvent: function(event) {
            if ($(document.body).hasClass('modal-open')) {
                // Don't do anything if there is a modal open
                return;
            }
            switch (event.keyCode) {
                case 78: // 'N' key
                case 82: // 'R' key
                case 32: // 'Space' key
                    vent.trigger('article:show');
                    break;
                case 70: // 'F' key
                    vent.trigger('article:favorite');
                    break;
                case 27: // 'Esc' key
                    if (confirm("Are you sure you want to start over?")) {
                        // Hope y'all had fun.
                        window.localStorage.clear();
                        window.location.reload();
                    }
                    break;
                case 191: // '?' key (really '/' but shh don't tell anyone)
                    $('#kbdModal').modal('show');
                    break;
                default:
                    break;
            }
        },

        _isDisambiguationArticle: function(article) {
            // Articles with namespace 14 don't have 'content'... they just point
            // to other articles.
            if (article.categories && article.categories.length) {
                for (var i = 0; i < article.categories.length; i++) {
                    if (article.categories[i].ns === 14) {
                        return true;
                    }
                }
            }
            return false;
        }
    };

});