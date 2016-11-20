angular.module("IndividualRankinglistApp")
.controller("IndividualRankingListCtrl",function($scope,$http){
    console.log("Indivindividualrankingsking List controllerindividualrankingsized");
    function refresh(){
    $http.get("/api/v1/individualrankings").success(function(individualrankings){
        $scope.individualrankings=individualrankings;


    });
}
    $scope.addIndividualRanking = function(){
        console.log($scope.newIndividualRankings);
        $http.post("/api/v1/individualrankings",$scope.newIndividualRankings).success(function(){
        refresh();

        });
    }
    $scope.deleteContact = function(name){
        console.log($scope.newIndividualRankings);
        $http.delete("/api/v1/individualrankings/"+name).success(function(){
        refresh();

    });
    }


    refresh()  ;  
  
});