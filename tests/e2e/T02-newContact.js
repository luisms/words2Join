describe('Add contact', function(){
    it('should show add a new contact',function(){
        browser.get("http://localhost:10000");
        element.all(by.repeater("contact in contacts")).then(function(initialContacts){
            element(by.model("newContact.name")).sendKeys("pepe");
            element(by.model("newContact.phone")).sendKeys(1234);
            element(by.model("newContact.email")).sendKeys("pepe@gmail.com");
            element(by.css("[value='add']")).click();
            element.all(by.repeater("contact in contacts")).then(function(finalContacts){
                expect(finalContacts.length).toEqual(initialContacts.length+1);
            });
        });
    });
});