angular.module("IndividualRankinglistApp")
.controller("IndividualRankingEditCtrl",function($scope,$http,$routeParams,$location){
    console.log("IndividualRanking list controller initialized");
    $http.get("/api/v1/individualranking/"+ $routeParams.name).success(function(individualranking){
        $scope.individualranking=individualranking;




    });


$scope.updateContact = function(){
        console.log($scope.newIndividualRanking);
        $http.put("/api/v1/individualranking/"+$routeParams.name,$scope.newIndividualRanking).success(function(){
        $location.path("/")

        });


    }

});