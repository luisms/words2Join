describe('Some data is loaded', function () {
    it('should show some data in ranking', function () {
        browser.get("http://localhost:10000/#/users/jose", 2000, function (req, res) {
            var ranking = element.all(by.repeater("globalranking in ranking"));
            expect(ranking.count()).toBeGreaterThan(0);
        });
    });
});
