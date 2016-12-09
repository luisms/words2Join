
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
            templateUrl:"home.html"
        })
        .when("/individualGames/:player",{
            controller:"game-ctrl",
            templateUrl:"game.html"
        })
    
        .when("/individualRankings",{
            controller:"IndividualRankingListCtrl",
            templateUrl:"globalranking-list.html"
        })
        .when("/individualRankings/:name",{
            controller:"IndividualRankingEditCtrl",
            templateUrl:"individualranking-edit.html"
        })
}) ;
