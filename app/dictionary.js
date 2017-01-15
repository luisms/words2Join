module.exports = function (app, apiBaseURL, db) {
    //To get frequency of a word received:
    app.get(apiBaseURL + '/dictionary/:word', function (req, res) {
        console.log("GET to obtain the frequency of a word");
        db.find({word: req.params.word}, (err, word) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if(word.length > 0){
                    res.send(word);
                }else{
                    res.sendStatus(204);
                }
            }
        });
    });
};