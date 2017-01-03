describe('Some data is loaded', function(){
    it('should show some data in the contact-list',function(){
        browser.get("http://localhost:10000");
        var contacts = element.all(by.repeater("contact in contacts"));
        expect(contacts.count()).toBeGreaterThan(0);
    });
});