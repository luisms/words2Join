module.exports = function (app, apiBaseURL, db) {

    //To get global ranking:
    app.get(apiBaseURL + '/individualRankings', function (req, res) {
        console.log("GET to obtain global ranking");
        db.find({}, (err, allranking) => {
            if (err) {
                res.sendStatus(500);
            } else {
                allranking.sort(function(a, b){return b.score - a.score});
                res.send(allranking);
            }
        });
    });

    //To get individual ranking:
    app.get(apiBaseURL + '/individualRankings/:idUser', function (req, res) {
        console.log("GET to obtain individual ranking");
        db.find({}, (err, indranking) => {
            var rankingByPlayer = new Array();
            if (err) {
                res.sendStatus(500);
            } else {
                indranking.forEach(function (element) {
                    if (element.player == req.params.idUser){
                        rankingByPlayer.push(element);
                    }
                });
                if (rankingByPlayer != null){
                    rankingByPlayer.sort(function(a, b){return b.score - a.score});
                    res.send(rankingByPlayer);
                }else{
                    res.sendStatus(200);
                }
            }
        });
    });
};