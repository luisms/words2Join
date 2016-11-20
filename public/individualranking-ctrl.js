angular.module("IndividualRankinglistApp")
.controller("IndividualRankingEditCtrl",function($scope,$http,$routeParams,$location){
    console.log("IndividualRanking list controller initialized");
    $http.get("/api/v1/individualrankings/"+ $routeParams.name).success(function(individualranking){
        $scope.individualranking=individualranking;




    });


$scope.updateIndividualRanking = function(){
        console.log($scope.newIndividualRanking);
        $http.put("/api/v1/individualrankings/"+$routeParams.name,$scope.newIndividualRanking).success(function(){
        $location.path("/");

        });


    }

});