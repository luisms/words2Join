
angular.module("words2JoinAPP",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        .when("/",{
            redirectTo: function() {
                window.location = "http://localhost:3000/homePage";
             } 
        })
        .when("/individualGames",{
            controller:"home-ctrl",
            templateUrl:"views/home.html"
        })
        .when("/individualGames/:player",{
            controller:"game-ctrl",
            templateUrl:"views/game.html"
        })

        .when("/profile/:player",{
            controller:"profile-ctrl",
            templateUrl:"views/profile.html"
        })
    
        .when("/ranking",{
            controller:"globalranking-ctrl",
            templateUrl:"views/globalranking.html"
        })
        .when("/ranking/:name",{
            controller:"individualranking-ctrl",
            templateUrl:"views/individualranking.html"
        })
}) ;
