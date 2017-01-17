angular.module("words2JoinAPP")
    .controller("hardgame-ctrl", function ($scope, $http, $routeParams, $location) {
        console.log("hard game controller");
        $scope.showError = false;
        $scope.player = $routeParams.username;
        $scope.words = [];
        $scope.score = 0;
        $scope.game = true;
        $scope.end = false;
        $scope.pickedChar = 'Null';
        function randomChar() {
            var possible = "abcdefghijklmnñopqrstuvwxyz";
            var pickedChar = possible.charAt(Math.floor(Math.random() * possible.length));
            $scope.pickedChar = pickedChar;
            $scope.newWord = pickedChar;
        }
        randomChar();
        $scope.addWord = function () {
            if ($scope.newWord.slice(0,1) ==  $scope.pickedChar) {
                console.log("new word");
                if ($scope.words.indexOf($scope.newWord) != -1) {
                    $scope.showError = true;
                    $scope.error = "The word is repeated.";
                } else {
                    $http.get("/api/v1/dictionary/" + $scope.newWord).then(function (response) {
                        console.log("Status de la peticion: " + response.status);
                        if (response.status == 204) {
                            $scope.showError = true;
                            $scope.error = "The word is incorrect.";
                        } else {
                            $scope.showError = false;
                            $scope.words.push(response.data[0].word);
                            $scope.score += parseInt((response.data[0].word.length / (response.data[0].frec + 0.01)) * 1000);
                            console.log("Score actual: " + ((response.data[0].word.length / (response.data[0].frec + 0.01)) * 1000));
                            console.log("Score: " + $scope.score);
                        }
                        randomChar();
                        console.log("Cantidad de palabras: " + $scope.words.length);
                        if ($scope.words.length == 10) {
                            $scope.game = false;
                            $scope.end = true;
                            document.getElementsByTagName('timer')[0].stop();
                        }
                    });
                }
            }else{
                $scope.showError = true;
                $scope.error = "The first letter isn't correct.";
                $scope.newWord = $scope.pickedChar;
            }
            
        }
        $scope.endGame = function () {
            var date = new Date();
            $http.post("/api/v1/individualGames", {
                "player": $scope.player,
                "score": $scope.score,
                "date": date
            }).then(function () {
                $location.path("/home/" + $scope.player);
            });
        }
        /*
        $scope.randomChar = function () {
            var possible = "abcdefghijklmnñopqrstuvwxyz";
            var pickedChar = possible.charAt(Math.floor(Math.random() * possible.length));
            $scope.pickedChar = pickedChar;
            $scope.newWord = pickedChar;
        }
        */
        $scope.$on('timer-stopped', function (event, data) {
            console.log('Timer Stopped - data = ', data);
            $scope.$apply(function () {
                $location.path("/home/" + $scope.player);
            });
        });
    });