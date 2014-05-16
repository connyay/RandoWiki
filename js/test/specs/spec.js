define([
    'chai',
    'layouts/MainLayout',
    'collections/Articles',
    'models/Article',
    'views/SpinnerView',
    'layouts/NavigationLayout',
    'views/KbdView'
], function(chai, MainLayout, Articles, Article, SpinnerView, NavigationLayout, KbdView) {
    var expect = chai.expect;

    describe('RandoWiki', function() {

        describe('Layout Tests', function() {

            describe('MainLayout', function() {
                beforeEach(function() {
                    this.layout = new MainLayout();
                    this.layout.render();
                });

                it('Should have an articles collection', function() {
                    expect(this.layout.collection).to.exist;
                    expect(this.layout.collection).to.be.an.instanceof(Articles);
                });

                it('Should have a rendered a navigation layout', function() {
                    expect(this.layout.navigation).to.exist;
                    expect(this.layout.navigation).to.be.an.instanceof(NavigationLayout);
                    expect(this.layout.navigation._isRendered).to.be.true;
                });

                it('Should have a spinner in the article region', function() {
                    expect(this.layout.article.currentView).to.exist;
                    expect(this.layout.article.currentView).to.be.an.instanceof(SpinnerView);
                });

                it('Should have keyboard help in the help region', function() {
                    expect(this.layout.help.currentView).to.exist;
                    expect(this.layout.help.currentView).to.be.an.instanceof(KbdView);
                });
            });

            describe('NavigationLayout', function() {
                beforeEach(function() {
                    window.localStorage.clear();
                    this.layout = new NavigationLayout({
                        collection: new Articles()
                    }).render();
                });

                it('Should have an articles collection', function() {
                    expect(this.layout.collection).to.exist;
                    expect(this.layout.collection).to.be.an.instanceof(Articles);
                });

                it('Should have history dropdown view', function() {
                    expect(this.layout.historyDropDownView).to.exist;
                });

                it('Should have favorite dropdown view', function() {
                    expect(this.layout.favoriteDropDownView).to.exist;
                });

            });
        });

        describe('Collection Tests', function() {

            describe('Articles', function() {
                beforeEach(function() {
                    window.localStorage.clear();
                    this.articles = new Articles();
                });

                it('Should not have any models', function() {
                    expect(this.articles.models).to.have.length(0);
                });

                it('Should load 10 random articles', function(done) {
                    var models = this.articles.models;
                    this.articles.seedRandom().then(function() {
                        expect(models).to.have.length(10);
                        done();
                    });
                });

                it('Should return 1 article', function(done) {
                    this.articles.fetchOne().then(function(article) {
                        expect(article).to.exist;
                        expect(article).to.be.an.instanceof(Article);
                        done();
                    });
                });
            });

        });

        describe('Model Tests', function() {

            describe('Article', function() {
                beforeEach(function() {
                    window.localStorage.clear();
                    this.articles = new Articles();
                    this.article = new Article({
                        pageID: 33678253,
                        title: 'Backbone.js'
                    });
                    this.articles.add(this.article);
                });

                it('Should not be seen', function() {
                    expect(this.article.get('seen')).to.be.false;
                });

                it('Should not be favorited', function() {
                    expect(this.article.get('favorite')).to.be.false;
                });

                it('Should load content', function(done) {
                    var article = this.article;
                    article.loadContent().then(function() {
                        expect(article.get('content')).to.not.equal('');
                        done();
                    });
                });

            });
        });
    });
});