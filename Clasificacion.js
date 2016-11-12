var app = express();
var apiBaseURL = "/api/v1";

var jugador1 = { ranking: 1, puntuacion: 9999, jugador: "jugador 1"};
var jugador2 = { ranking: 2, puntuacion: 8888, jugador: "jugador 1"};
var jugador3 = { ranking: 3, puntuacion: 7777, jugador: "jugador 1"};
var jugador4 = { ranking: 4, puntuacion: 6666, jugador: "jugador 1"};
var jugador5 = { ranking: 5, puntuacion: 5555, jugador: "jugador 1"};
var jugador6 = { ranking: 6, puntuacion: 4444, jugador: "jugador 1"};
var jugador7 = { ranking: 7, puntuacion: 3333, jugador: "jugador 1"};
var jugador8 = { ranking: 8, puntuacion: 2222, jugador: "jugador 1"};
var jugador9 = { ranking: 9, puntuacion: 1111, jugador: "jugador 1"};
var jugador10 = { ranking: 10, puntuacion: 0000, jugador: "jugador 1"};

var jugadores = [jugador1,jugador2,jugador3,jugador4,jugador5,jugador6,jugador7,jugador8,jugador9,jugador10];

app.use(bodyParser.json());

app.get(apiBaseURL+'/jugadores',function(req,res)
{
	console.log("New GET");
	res.json(jugadores);
});

app.post(apiBaseURL+'/jugadores',function(req,res){
	var jugador = req.body;

	console.log("New POST");
	
	res.push(jugador);
	res.sendStatus(200);
});

app.delete(apiBaseURL+'/jugadores',function(req,res){
	var jugador = req.body;

	console.log("New DELETE");
	res.remove(jugador);
    res.sendStatus(200);

});


app.listen(1000);