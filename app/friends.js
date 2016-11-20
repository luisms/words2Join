module.exports = function (app, apiBaseURL) {

   //The requiired's files;
var express= require('express');
var path = require('path');
var dataStore =require('nedb');
var dbFileName = path.join(__dirname,'individualrankings.json');
var bodyParser = require('body-parser');


//Init api and db vars:

var app = express();

//var apiBaseURL = "/api/v1";

var db = new dataStore({

        filename: dbFileName,

        autoload: true

    });



console.log("DB initialized");



var dateNow = new Date();

//Init individual individualrankings vars:

//typedef var individualrankingX {idRanking, idUser, nameUserm, ScoreGame}

var individualranking1 = {ranking: 1, player: "Pablo", score: "1975", date: dateNow.toISOString()};

var individualranking2 = {ranking: 2, player: "Paco", score: "1290", date: dateNow.toISOString()};

var individualranking3 = {ranking: 3, player: "Macarena", score: "1275", date: dateNow.toISOString()};

var individualranking4 = {ranking: 4, player: "Rogelia", score: "1200", date: dateNow.toISOString()};

var individualranking5 = {ranking: 5, player: "Pamela", score: "1100", date: dateNow.toISOString()};

var individualranking6 = {ranking: 6, player: "Rocco", score: "1090", date: dateNow.toISOString()};

var individualranking7 = {ranking: 7, player: "Alex", score: "1075", date: dateNow.toISOString()};

var individualranking8 = {ranking: 8, player: "Pablo", score: "990", date: dateNow.toISOString()};

var individualranking9 = {ranking: 9, player: "Fermín", score: "875", date: dateNow.toISOString()};

var individualranking10 = {ranking: 10, player: "Pablo", score: "690", date: dateNow.toISOString()};



//init individual individualrankings array var:

var individualrankings = [individualranking1,individualranking2,individualranking3,individualranking4,individualranking5,individualranking6,individualranking7,individualranking8,individualranking9,individualranking10];

//Init db with data's example:

db.find({}, (err,players)=>{

    if(players.length == 0){

        db.insert(individualrankings);

        console.log("EMPTY DB! Inserted'"+individualrankings.length+"'default players");

    }else{

        console.log("Loaded DB with "+players.length+" players");

    }

});

app.set('port',(process.env.PORT || 10000));

app.use(bodyParser.json());



//To get all individual individualrankings all players:

app.get(apiBaseURL+'/individualrankings',function(req,res){

	console.log("GET to obtain all players's ranking");

	db.find({},(err,individualrankings)=>{

        if (err){

            res.sendStatus(500);

        }else{ 

            res.send(individualrankings);

        }

    });

});



//To get all individual individualrankings one player:

app.get(apiBaseURL+'/individualrankings/:player',function(req,res){

	console.log("GET to obtain one players's individualrankings");

	db.find({},(err,individualrankings)=>{

		var individualrankingsByPlayer = new Array();

        if (err){

            res.sendStatus(500);

        }else{ 

        	individualrankings.forEach(function(element){

				if (element.player == req.params.player) 

		            individualrankingsByPlayer.push(element);

			});  

			if(individualrankingsByPlayer != null)

				res.send(individualrankingsByPlayer);

			else

				res.sendStatus(200);

        }

    });

});



//To add individual game at individualrankings:

app.post(apiBaseURL+'/individualrankings',function(req,res){

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





//To update individual game at individualrankings:

app.put(apiBaseURL+'/individualrankings/:ranking',(req,res)=>{

	var ranking = req.params.ranking;

    var individualranking = req.body;



    console.log("New PUT request over /individualrankings/"+ranking);

    console.log("Data: "+JSON.stringify(individualranking,2));



    if(ranking != individualranking.ranking){

        res.sendStatus(409);

        return;

    }



    db.update({ranking: parseInt(ranking)},individualranking,(err,numUpdates)=>{

        if (err){

            res.sendStatus(500);

        }else{ 

            console.log("Updated "+numUpdates+" objects");

            res.sendStatus(200);

        }

    })

});



//To delete one individual game from individualrankings:



app.delete(apiBaseURL+"/individualrankings/:ranking",(req,res)=>{



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



};