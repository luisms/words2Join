var express = require('express');
var bodyParser = require ('body-parser');

var app = express();
var apiBaseUrl="api/v1" //versión de la api.
//var palabras = {palabra1 :"",palabra2: "",palabra3 :"",palabra4: "",palabra5 :"",palabra6 :""
//                ,palabra6 :"",palabra7 :"",palabra8 :"",palabra9 :"",palabra0 :""}

partida0 = {usuario:"luis",fecha:"11/11/2016"};
var partida = {usuario:"",fecha:""}
var partidas=[];

app.use(bodyParser.json());

app.get(apiBaseUrl+'/partidas',function(req,res){ //request y response 
    console.log("NEW GET");
    res.send(partidas);
        res.sendStatus(200);

});

app.post(apiBaseUrl+'/partidas',function(req,res){
    var partidas = req.body;
    console.log("NEW POST");
    console.log("DATA: "+req.body);
    partidas.push(partida);
    res.send(partidas);
        res.sendStatus(200);

});



app.delete(apiBaseUrl+'/partidas',function(req,res){
    console.log("Delete");
    partidas.slice(0,partidas.length());
        res.sendStatus(200);

});

/*app.put(apiBaseUrl+'/partidas/:partida',function(req,res){
    console.log("UPDATE");
    for(i=0;i<partidas.length;i++){
      if(  partidas[i].usuario==req.params.id){
          }
    }
    res.sendStatus(200);

});
*/

app.listen(65000);
console.log("Running...")

