angular.module("words2JoinAPP", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/authentication.html",
                access: { restricted: false }
            })
            .when("/login", {
                controller: "login-ctrl",
                templateUrl: "views/login.html",
                access: { restricted: false }
            })
            .when("/signup", {
                controller: "signup-ctrl",
                templateUrl: "views/signup.html",
                access: { restricted: false }
            })
            .when("/home/:username", {
                controller: "home-ctrl",
                templateUrl: "views/home.html",
                access: { restricted: true }
            })
            .when("/individualGames/:username", {
                controller: "game-ctrl",
                templateUrl: "views/game.html",
                access: { restricted: true }
            })
            .when("/profile/:username", {
                controller: "profile-ctrl",
                templateUrl: "views/profile.html",
                access: { restricted: true }
            })

            .when("/ranking", {
                controller: "globalranking-ctrl",
                templateUrl: "views/globalranking.html",
                access: { restricted: true }
            })
            .when("/ranking/:username", {
                controller: "individualranking-ctrl",
                templateUrl: "views/individualranking.html",
                access: { restricted: true }
            })
    }).config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    //Redireccionamiento en función de los permisos y de si se ha realizado el login
    .run(function($rootScope, $location, $route) {
        $rootScope.$on('$routeChangeStart',
            function(event, next, current) {
                //Redireccionamiento para cualquier URL equivocada
                if(next == null){
                    if(($rootScope.isLogged == null || $rootScope.isLogged == false)){
                        $location.path('/');
                        $route.reload();
                    }else if($rootScope.isLogged == true){
                        $location.path('/home/' + $rootScope.username);
                    }
                //Evita acceder a los accesos de usuario una vez logueado y tambien que se acceda a lugares con privilegios antes del login
                }else{
                    if(next.access && next.access.restricted && ($rootScope.isLogged == null || $rootScope.isLogged == false)){
                        $location.path('/');
                        $route.reload();
                    }else if($rootScope.isLogged == true && (next.originalPath == "/login" || next.originalPath == "/signup" || next.originalPath == "/")){
                        $location.path('/home/' + $rootScope.username);
                    }
                }
            });
    });
