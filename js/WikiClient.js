define(function() {
    var baseURL = 'http://en.wikipedia.org/w/api.php?action=query';
    return {
        getRandomList: function(args) {
            var dfd = new $.Deferred();
            args = _.defaults(args || {}, {
                limit: 10,
                ns: 0
            });
            $.getJSON(baseURL + '&list=random&rnnamespace=' + args.ns + '&rnlimit=' + args.limit + '&format=json&callback=?', function(data) {
                var articles = data && data.query && data.query.random && data.query.random;
                if (articles) {
                    dfd.resolve(articles);
                }
            });
            return dfd.promise();
        },

        loadArticle: function(pageId) {
            var dfd = new $.Deferred();
            // The categories prop seems to add quite a bit of overhead.
            // Might not be worth it for the random 'disambiguation' articles
            // that we are trying to filter / find
            $.getJSON(baseURL + '&pageids=' + pageId + '&prop=extracts|categories&exchars=600&format=json&callback=?', function(data) {
                var article = data && data.query && data.query.pages && data.query.pages[pageId];
                if (article) {
                    dfd.resolve(article);
                }
            });
            return dfd.promise();
        }
    };

});