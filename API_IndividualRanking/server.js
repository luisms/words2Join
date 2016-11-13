//The requiired's files;
var express = require('express');
var bodyParser = require ('body-parser');

//Init api vars:
var app = express();
var apiBaseURL = "/api/v1";

//Init individual games vars:
//typedef var individualGameX {idRanking, idUser, nameUserm, ScoreGame}
var individualGame1 = {idRanking: 1, idUser: 1, user: "Pablo", score: "1975"};
var individualGame2 = {idRanking: 2, idUser: 2, user: "Paco", score: "1290"};
var individualGame3 = {idRanking: 3, idUser: 3, user: "Macarena", score: "1275"};
var individualGame4 = {idRanking: 4, idUser: 4, user: "Rogelia", score: "1200"};
var individualGame5 = {idRanking: 5, idUser: 5, user: "Pamela", score: "1100"};
var individualGame6 = {idRanking: 6, idUser: 6, user: "Rocco", score: "1090"};
var individualGame7 = {idRanking: 7, idUser: 7, user: "Alex", score: "1075"};
var individualGame8 = {idRanking: 8, idUser: 1, user: "Pablo", score: "990"};
var individualGame9 = {idRanking: 9, idUser: 8, user: "Fermín", score: "875"};
var individualGame10 = {idRanking: 10, idUser: 1, user: "Pablo", score: "690"};

//init individual games array var:
var individualRanking = [individualGame1,individualGame2,individualGame3,individualGame4,individualGame5,individualGame6,individualGame7,individualGame8,individualGame9,individualGame10];
app.use(bodyParser.json());

//To get all individual ranking all players:
app.get(apiBaseURL+'/individualRanking',function(req,resp){
	console.log("GET to obtain all players's ranking");
	resp.json(individualRanking);
});

//To get all individual ranking one player:
app.get(apiBaseURL+'/individualRanking/:idUser',function(req,resp){
	console.log("GET to obtain one players's ranking");
	var indUserRanking = new Array();
	individualRanking.forEach(function(element){
		//console.log(req.params.idUser+ ' ' + element);
		if (element.idUser == req.params.idUser) 
            indUserRanking.push(element);
	});  
	if(indUserRanking != null)
		resp.json(indUserRanking);
	else
		resp.sendStatus(200);
});

//To add individual games at ranking:
app.post(apiBaseURL+'/individualRanking',function(req,resp){
	console.log("POST to add individual ranking");
	var indGame = req.body;
	console.log(JSON.stringify(indGame, null, ' '));
	if (individualRanking == null) {
        individualRanking = new Array(indGame);
    } else {
        individualRanking.push(indGame);  
	}
	resp.sendStatus(200);
});

//To update individual games at ranking:
app.put(apiBaseURL+'/individualRanking/',function(req,resp){
	console.log("PUT to update individual ranking");
	if (individualRanking == null) {
        console.log("No hay partidas en la lista");
    } else {
        for(i=0; i < individualRanking.length; i++) {
	        if (individualRanking[i].idRanking == req.body.idRanking) {
	            individualRanking[i].idUser = req.body.idUser;
	            individualRanking[i].user = req.body.user;
	            individualRanking[i].score = req.body.score;
	            break;
			}
		}
	}
	console.log(individualRanking);

	resp.sendStatus(200);
});

//To delete one individual game from ranking:
app.delete(apiBaseURL + '/individualRanking/:idRanking', function (req, res) {
    console.log("Delete individual game from individualRanking");
	var removed = individualRanking.filter(function(element) {
    	return element.idRanking != req.params.idRanking;
	});	
	console.log(JSON.stringify(removed, null, ' '));
    res.sendStatus(200);
});


app.listen(2000);
console.log("Running...");