//API MADE BY LUIS MUÑOZ SAAVEDRA
var express = require('express');

var bodyParser = require ('body-parser');

var app = express();
var apiBaseUrl="/api/v1" //versión de la api.



partida= {"player" : "luis", "date":"11/11/2016"};
var listaPartidas=[partida];

app.use(bodyParser.json());

app.get(apiBaseUrl+'/games',function(req,res){ //request y response 
    console.log("NEW GET");
    res.send(listaPartidas);
    //
});

app.post(apiBaseUrl+'/games',function(req,res){
    var partidas = req.body;
    console.log("NEW POST");
    console.log("DATA: "+req.body);
    console.log(JSON.stringify(partidas));
    listaPartidas.push(partidas);
    res.send(partidas);
    //res.sendStatus(200);

});



app.delete(apiBaseUrl+'/games',function(req,res){
    console.log("Delete");
    listaPartidas.splice(0,listaPartidas.length);
        res.sendStatus(200);

});

app.put(apiBaseUrl+'/games/:player',function(req,res){
    console.log("UPDATE");
    for(i=0;i<listaPartidas.length;i++){
      if(  listaPartidas[i].player==req.params.player){
             console.log(JSON.stringify(req.params.player));
            listaPartidas[i].date=req.body.date;
            console.log(JSON.stringify(req.body.date));
          }
    
    }
    res.sendStatus(200);

});


app.listen(65000);
console.log("Running...")

