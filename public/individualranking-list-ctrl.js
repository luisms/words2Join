angular.module("IndividualRankinglistApp")
.controller("IndividualRankingListCtrl",function($scope,$http){
    console.log("IndividualRangs List controller");
    function refresh(){
    $http.get("/api/v1/individualrankings").success(function(individualrankings){
        $scope.individualrankings=individualrankings;


    });
}
    $scope.addIndividualRanking = function(){
        console.log($scope.newindividualrankings);
        $http.post("/api/v1/individualrankings",$scope.newindividualranking).success(function(){
        refresh();

        });
    }
    $scope.deleteContact = function(name){
        console.log($scope.newindividualRankings);
        $http.delete("/api/v1/individualrankings/"+name).success(function(){
        refresh();

    });
    }


    refresh()  ;  
  
});