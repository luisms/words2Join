//The requiired's files;
var express = require('express');
var bodyParser = require ('body-parser');
var path = require('path');
var dataStore = require("nedb");
var dbFileName = path.join(__dirname,'individualGames.json');

//Init api and db vars:
var app = express();
var apiBaseURL = "/api/v1";
var db = new dataStore({
        filename: dbFileName,
        autoload: true
    });

console.log("DB initialized");

var dateNow = new Date();
//Init individual games vars:
//typedef var individualGameX {idRanking, idUser, nameUserm, ScoreGame}
var individualGame1 = {ranking: 1, player: "Pablo", score: "1975", date: dateNow.toISOString()};
var individualGame2 = {ranking: 2, player: "Paco", score: "1290", date: dateNow.toISOString()};
var individualGame3 = {ranking: 3, player: "Macarena", score: "1275", date: dateNow.toISOString()};
var individualGame4 = {ranking: 4, player: "Rogelia", score: "1200", date: dateNow.toISOString()};
var individualGame5 = {ranking: 5, player: "Pamela", score: "1100", date: dateNow.toISOString()};
var individualGame6 = {ranking: 6, player: "Rocco", score: "1090", date: dateNow.toISOString()};
var individualGame7 = {ranking: 7, player: "Alex", score: "1075", date: dateNow.toISOString()};
var individualGame8 = {ranking: 8, player: "Pablo", score: "990", date: dateNow.toISOString()};
var individualGame9 = {ranking: 9, player: "Fermín", score: "875", date: dateNow.toISOString()};
var individualGame10 = {ranking: 10, player: "Pablo", score: "690", date: dateNow.toISOString()};

//init individual games array var:
var individualGames = [individualGame1,individualGame2,individualGame3,individualGame4,individualGame5,individualGame6,individualGame7,individualGame8,individualGame9,individualGame10];
//Init db with data's example:
db.find({}, (err,players)=>{
    if(players.length == 0){
        db.insert(individualGames);
        console.log("EMPTY DB! Inserted'"+individualGames.length+"'default players");
    }else{
        console.log("Loaded DB with "+players.length+" players");
    }
});
app.set('port',(process.env.PORT || 10000));
app.use(bodyParser.json());

//To get all individual games all players:
app.get(apiBaseURL+'/individualGames',function(req,res){
	console.log("GET to obtain all players's ranking");
	db.find({},(err,games)=>{
        if (err){
            res.sendStatus(500);
        }else{ 
            res.send(games);
        }
    });
});

//To get all individual games one player:
app.get(apiBaseURL+'/individualGames/:player',function(req,res){
	console.log("GET to obtain one players's games");
	db.find({},(err,games)=>{
		var gamesByPlayer = new Array();
        if (err){
            res.sendStatus(500);
        }else{ 
        	games.forEach(function(element){
				if (element.player == req.params.player) 
		            gamesByPlayer.push(element);
			});  
			if(gamesByPlayer != null)
				res.send(gamesByPlayer);
			else
				res.sendStatus(200);
        }
    });
});

//To add individual game at games:
app.post(apiBaseURL+'/individualGames',function(req,res){
	console.log("POST to add individual game");
	var game = req.body;
	if (game == null) {
        console.log("No data sent -> null request at post or no name's player");
    } else {
    	db.insert(game);
    	console.log("Game Inserted:"+JSON.stringify(game, null, ' '));  
	}
	res.sendStatus(200);
});


//To update individual game at games:
app.put(apiBaseURL+'/individualGames/:ranking',(req,res)=>{
	var ranking = req.params.ranking;
    var individualGame = req.body;

    console.log("New PUT request over /individualGames/"+ranking);
    console.log("Data: "+JSON.stringify(individualGame,2));

    if(ranking != individualGame.ranking){
        res.sendStatus(409);
        return;
    }

    db.update({ranking: parseInt(ranking)},individualGame,(err,numUpdates)=>{
        if (err){
            res.sendStatus(500);
        }else{ 
            console.log("Updated "+numUpdates+" objects");
            res.sendStatus(200);
        }
    })
});

//To delete one individual game from games:

app.delete(apiBaseURL+"/individualGames/:ranking",(req,res)=>{

    var ranking = req.params.ranking;
    console.log("New DELETE request over /contact/"+ranking);

    db.remove({ranking : parseInt(ranking)},{},(err,numRemoved)=>{
        if (err){
            res.sendStatus(500);
        }else{ 
            console.log("Deleted "+numRemoved+" objects");
            res.sendStatus(200);
        }
    })
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});
console.log("Running...");