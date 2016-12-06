angular.module("words2JoinAPP")
.controller("home-ctrl",function($scope,$location){
    console.log("game controller");

    $scope.playGame = function(){
            console.log($scope.newGame);
            $location.path("/individualGames/"+$scope.newGame.player);           
    }   
    $scope.profile = function(){
            console.log($scope.newGame);
            $location.path("/profile/"+$scope.newGame.player);           
    }   
});