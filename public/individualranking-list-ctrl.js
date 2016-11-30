angular.module("words2JoinAPP")
.controller("IndividualRankingListCtrl",function($scope,$http){
    console.log("IndividualRangs List controller");
    function refresh(){
    $http.get("/api/v1/individualRankings").success(function(individualrankings){
        $scope.individualrankings=individualrankings;


    });
}
    $scope.addIndividualRanking = function(){
        console.log($scope.newindividualrankings);
        $http.post("/api/v1/individualRankings",$scope.newindividualranking).success(function(){
        refresh();

        });
    }
    $scope.deleteIndividualRanking = function(name){
        console.log(name);
        $http.delete("/api/v1/individualRankings/"+name).success(function(){
        refresh();

    });
    }


    refresh()  ;  
  
});