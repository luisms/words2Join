angular.module("words2JoinAPP")
    .controller("game-ctrl", function ($scope, $http, $routeParams, $location) {
        console.log("game controller");
        $scope.player = $routeParams.player;
        $scope.words = [];
        $scope.score = 0;
        $scope.game = true;
        $scope.end = false;
        $scope.addWord = function () {
            if ($scope.newWord != null) {
                console.log("new word");
                $scope.words.push($scope.newWord);
                $scope.score += $scope.newWord.length;
                $scope.newWord = "";
                console.log("Cantidad de palabras: " + $scope.words.length);
                if ($scope.words.length == 10) {
                    $scope.game = false;
                    $scope.end = true;
                }
            }
        }
        $scope.endGame = function () {
            var date = new Date();
            $http.post("/api/v1/individualGames", {
                "ranking": 1,
                "player": $scope.player,
                "score": $scope.score,
                "date": date
            }).success(function () {
                $location.path("/");
            });
        }
    });