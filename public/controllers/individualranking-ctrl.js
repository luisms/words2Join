angular.module("words2JoinAPP")
.controller("individualranking-ctrl",function($scope,$http,$routeParams,$location){
    console.log("Individual ranking controller");
    $http.get("/api/v1/individualRankings/"+ $routeParams.username).success(function(individualrankings){
        $scope.individualrankings=individualrankings;
    });


$scope.updateIndividualRanking = function(){
        console.log($scope.individualranking);
        $http.put("/api/v1/individualRankings/"+$routeParams.username,$scope.individualranking).success(function(){
        $location.path("/");
        });
    }
});