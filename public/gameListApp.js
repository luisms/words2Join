angular.module("words2JoinAPP",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
        /*
        .when("/home",{
            controller:"home-ctrl",
            templateUrl:"views/home.html"
        })
        */
        .when("/",{
            templateUrl:"views/authentication.html"
        })
        .when("/login",{
            controller:"login-ctrl",
            templateUrl:"views/login.html"
        })
        .when("/signup",{
            controller:"signup-ctrl",
            templateUrl:"views/signup.html"
        })
        .when("/home",{
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
