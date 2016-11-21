angular.module("IndividualRankinglistApp")
.controller("IndividualRankingEditCtrl",function($scope,$http,$routeParams,$location){
    console.log("IndividualRanking list controller initialized");
    $http.get("/api/v1/individualRankings/"+ $routeParams.name).success(function(individualranking){
        $scope.individualranking=individualranking;
    });


$scope.updateIndividualRanking = function(){
        console.log($scope.individualranking);
        $http.put("/api/v1/individualRankings/"+$routeParams.name,$scope.individualranking).success(function(){
        $location.path("/");

        });


    }

});