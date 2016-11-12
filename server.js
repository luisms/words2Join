var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var apiBaseURL = "/api/v1";

var friends; //Formato: {string nombre, boolean peticion}
app.use(bodyParser.json());

app.get(apiBaseURL + '/friends', function(req,res){
    console.log("NEW GET");
    if (friends == null) {
        res.send("No hay amigos agregados");
    } else {
        res.json(friends);
    } 
});

app.post(apiBaseURL + '/friends', function (req, res) {
    var friend = req.body;
    console.log("NEW POST");
    console.log("Data: " + friend);
    if (friends == null) {
        friends = new Array(friend);
    } else {
        friends.push(friend);  
    }
    res.sendStatus(200);
});

app.put(apiBaseURL + '/friends', function (req, res) {
    //A partir de un nombre de usuario, actualiza la peticion de partida
    console.log("NEW PUT");
    for (i = 0; i < friends.length; i++) {
        if (friends[i].name == req.body.name) {
            friends[i].peticion = req.body.peticion;
        }
    }
    res.sendStatus(200);
});
//Borrado individual
app.delete(apiBaseURL + '/friends', function (req, res) {
    console.log("NEW DELETE");
    for (i = 0; i < friends.length; i++) {
        if (friends[i].name == req.body.name) {
            friends.splice(i,1);
        }
    } 
    res.sendStatus(200); 
});

app.listen(1000);

console.log("Running");
