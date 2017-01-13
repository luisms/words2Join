module.exports.initDBUsers = function (path, dataStore) {
    var dbFileName = path.join(__dirname, 'db/users.json');
    var dbUsers = new dataStore({
        filename: dbFileName,
        autoload: true
    });

    //typedef var Users {username, password}
    var user = {
        "username": "jose",
        "password": "prueba"
    };
    var users = [user];

    dbUsers.find({}, (err, user) => {
        if (user.length == 0) {
            dbUsers.insert(users);
            console.log("EMPTY users DB! Inserted'" + users.length + "'default users");
        } else {
            console.log("Loaded DB with " + user.length + " users");
        }
    });
    return dbUsers;
}

module.exports.initDBIndGame = function (path, dataStore) {
    var dbFileName = path.join(__dirname, 'db/individualGames.json');
    var dbIndGame = new dataStore({
        filename: dbFileName,
        autoload: true
    });

    //typedef var individualGameX {player, score, date, id}
    var dateNow = new Date();
    var individualGame1 = { player: "Pablo", score: 1975, date: dateNow.toISOString(), id: 1 };
    var individualGame2 = { player: "Paco", score: 1290, date: dateNow.toISOString(), id: 2 };
    var individualGame3 = { player: "Macarena", score: 1275, date: dateNow.toISOString(), id: 3 };
    var individualGame4 = { player: "Rogelia", score: 1200, date: dateNow.toISOString(), id: 4 };
    var individualGame5 = { player: "Pamela", score: 1100, date: dateNow.toISOString(), id: 5 };
    var individualGame6 = { player: "Rocco", score: 1090, date: dateNow.toISOString(), id: 6 };
    var individualGame7 = { player: "Alex", score: 1075, date: dateNow.toISOString(), id: 7 };
    var individualGame8 = { player: "Pablo", score: 990, date: dateNow.toISOString(), id: 8 };
    var individualGame9 = { player: "Fermín", score: 875, date: dateNow.toISOString(), id: 9 };
    var individualGame10 = { player: "Pablo", score: 690, date: dateNow.toISOString(), id: 10 };
    var individualGames = [individualGame1, individualGame2, individualGame3, individualGame4,
        individualGame5, individualGame6, individualGame7, individualGame8, individualGame9, individualGame10];

    dbIndGame.find({}, (err, players) => {
        if (players.length == 0) {
            dbIndGame.insert(individualGames);
            console.log("EMPTY Individual Game DB! Inserted'" + individualGames.length + "'default players");
        } else {
            console.log("Loaded DB with " + players.length + " players");
        }
    });
    return dbIndGame;
}

module.exports.initDBDictionary = function (path, dataStore, fs) {
    var dbFileName = path.join(__dirname, 'db/dictionary.json');
    var dbDictionary = new dataStore({
        filename: dbFileName,
        autoload: true
    });

    //console.log("Loaded DB dictionary");
    dbDictionary.find({}, (err, words) => {
        if (err) {
            console.log("Error: " + err);
        }
        if (words.length == 0) {
            console.log("EMPTY dictionary ");
            fs.readFile(path.join(__dirname, 'db/dictionaryMod.json'), 'utf8', function (err, data) {
                if (err) {
                    return console.log("Error al cargar documento con las palabras: " + err);
                }
                var lines = data.split('\r');
                console.log("Numero de palabras a escribir: " + lines.length);
                for (var line = 0; line < lines.length; line++) {
                    dbDictionary.insert(JSON.parse(lines[line].toString()));
                }
            });
            console.log("Carga del diccionario realizada." );
        } else {
            console.log("Loaded DB dictionary with " + words.length + " words");
        }
    });

    return dbDictionary;
}

module.exports.initDBFriends = function (path, dataStore) {
    var dbFileName = path.join(__dirname, 'db/friends.json');
    var dbFriend = new dataStore({
        filename: dbFileName,
        autoload: true
    });

    /*Format: {string player, "friends":[ {"player":"John", "score": integer, "date": formato fecha},
                                          {"player":"John", "score": integer, "date": formato fecha},
                                          {"player":"John", "score": integer, "date": formato fecha}]} */
    var dateNow = new Date();
    var friend = {
        "player": "jose",
        "friends": [{
            "player": "John",
            "date": "2012-04-23T18:25:43.511Z"
        }]
    };
    var friends = [friend];

    dbFriend.find({}, (err, players) => {
        if (players.length == 0) {
            dbFriend.insert(friends);
            console.log("EMPTY friends DB! Inserted'" + friends.length + "'default players");
        } else {
            console.log("Loaded DB with " + players.length + " players");
        }
    });
    return dbFriend;
}
