var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var apiBaseURL = "/api/v1";
var finded = false;

//Inputing datas
var player1 = { ranking: 1, score: 9999, player: "player1"};
var player2 = { ranking: 2, score: 8888, player: "player2"};
var player3 = { ranking: 3, score: 7777, player: "player3"};
var player4 = { ranking: 4, score: 6666, player: "player4"};
var player5 = { ranking: 5, score: 5555, player: "player5"};
var player6 = { ranking: 6, score: 4444, player: "player6"};
var player7 = { ranking: 7, score: 3333, player: "player7"};
var player8 = { ranking: 8, score: 2222, player: "player8"};
var player9 = { ranking: 9, score: 1111, player: "player9"};
var player10 = { ranking: 10, score: 0000, player: "player10"};
//Inputing values in a list
var players = [player1,player2,player3,player4,player5,player6,player7,player8,player9,player10];
app.set('port', (process.env.PORT || 5000));
app.use(bodyparser.json());

//Geting all players
app.get(apiBaseURL+'/players', function (req,res)
{
	console.log("New GET");
	res.json(players);
});

//Geting the ID of a single player
app.get(apiBaseURL+'/players/:id', function (req,res)
{
	console.log("New ID GET");
	i = 0;
	finded = false;
	while (i < players.length && !finded) {
		if(players[i].player == req.params.id){
			res.json(players[i]);
			finded = true;
		}
		i++;
	}
});

//Posting all players to be writen
app.post(apiBaseURL+'/players', function (req,res){
	var player = req.body;

	console.log("New POST");
	console.log(" Data: " + player);
	players.push(player);
	res.sendStatus(200);
});

//Putting the ID of a single player
app.put(apiBaseURL+'/players/:id',function(req,res){
	console.log("New ID PUT");
	
	i = 0;
	finded = false;
	while(i < players.length && !finded){
		if(players[i].player == req.params.id){
			players[i].ranking = req.body.ranking;
			players[i].score = req.body.score;
			finded = true;
		}
		i++;
	}

});

//Deleting all players
app.delete(apiBaseURL+'/players', function (req,res){
	console.log(" new DELETE");
    for (i = 0; i < players.length; i++) {

        if (players[i].player == req.body.player) {
            players.splice(i);
        }
    } 
    res.sendStatus(200); 
});

//Deleting the ID of a single player
app.delete(apiBaseURL+'/players/:id',function(req,res){
	console.log(" new ID DELETE");	
	for (i = 0; i < players.length; i++) {
        if (players[i].player == req.params.id) {
            players.splice(i,1);
        }
    } 
});

//app.listen(1000);
var port = app.get('port');
app.listen(port,function(){
	console.log('Node app is running on port', port);
});

console.log("Running...");