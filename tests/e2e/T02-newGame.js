describe('Add contact', function () {
    it('should show add a new contact', function () {
        browser.get("http://localhost:10000/#/users/jose", 2000, function (req, res) {

            element.all(by.repeater("word in words")).then(function (initialWords) {
                element(by.model("newWord")).sendKeys("click");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("raton");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("vino");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("percha");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("rima");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("sal");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("cruz");
                element(by.model("newWord")).sendKeys("externocleidomastoideo");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("esmeralda");
                element(by.css("[value='addWord']")).click();
                element(by.model("newWord")).sendKeys("crack");
                element(by.css("[value='addWord']")).click();

                element.all(by.repeater("individualGame in individualGames")).then(function (finalWords) {
                    expect(finalWords.length).toEqual(initialWords.length + 1);
                });
            });
        });
    });
});