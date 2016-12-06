angular.module("words2JoinAPP")
.controller("globalranking-ctrl",function($scope,$http){
    console.log("Global ranking controller");
    function refresh(){
    $http.get("/api/v1/individualRankings").success(function(ranking){
        $scope.ranking=ranking;


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