var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var apiBaseURL = "/api/v1";

var friends; //Formato: {string nombre, boolean peticion}
app.use(bodyParser.json());

//Muestra todos los usuarios
app.get(apiBaseURL + '/friends', function(req,res){
    console.log("NEW GET");
    if (friends == null) {
        res.send("No hay amigos agregados");
    } else {
        res.json(friends);
    } 
});

//Muestra solo el usuario solicitado en la URL
app.get(apiBaseURL + '/friends/:id', function (req, res) {
    console.log("NEW GET");
    for (i = 0; i < friends.length; i++) {
        if (friends[i].name == req.params.id) {
            res.json(friends[i]);
        }
    }
});

//Crea un amigo
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

//A partir de un nombre de usuario, actualiza la peticion de partida
app.put(apiBaseURL + '/friends/:id', function (req, res) {
    console.log("NEW PUT");
    for (i = 0; i < friends.length; i++) {
        if (friends[i].name == req.params.id) {
            friends[i].peticion = req.body.peticion;
        }
    }
    res.sendStatus(200);
});

//Borrado total
app.delete(apiBaseURL + '/friends', function (req, res) {
    console.log("NEW DELETE");
    friends.splice(0, friends.length);   
    res.sendStatus(200);
});

//Borrado individual
app.delete(apiBaseURL + '/friends/:id', function (req, res) {
    console.log("NEW DELETE");
    for (i = 0; i < friends.length; i++) {
        if (friends[i].name == req.params.id) {
            friends.splice(i,1);
        }
    } 
    res.sendStatus(200); 
});

app.listen(1000);

console.log("Running");
