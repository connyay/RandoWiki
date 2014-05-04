define([
    'chai',
    'collections/Articles'
], function(chai, Articles) {
    var expect = chai.expect;

    describe('RandoWiki', function() {
        before(function(done) {
            window.localStorage.clear();
            this.articles = new Articles();
            done();
        });
        describe('Articles Tests', function() {

            it('No Models', function(done) {
                expect(this.articles.models.length).to.equal(0);
                done();
            });

        });

    });
});