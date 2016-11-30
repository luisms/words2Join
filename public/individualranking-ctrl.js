angular.module("words2JoinAPP")
.controller("IndividualRankingEditCtrl",function($scope,$http,$routeParams,$location){
    console.log("IndividualRanking list controller initialized");
    $http.get("/api/v1/individualRankings/"+ $routeParams.name).success(function(individualrankings){
        $scope.individualrankings=individualrankings;
    });


$scope.updateIndividualRanking = function(){
        console.log($scope.individualranking);
        $http.put("/api/v1/individualRankings/"+$routeParams.name,$scope.individualranking).success(function(){
        $location.path("/");

        });


    }

});