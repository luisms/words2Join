angular.module("words2JoinAPP", ["ngRoute", 'auth0', 'angular-storage', 'timer'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "Auth0-ctrl",
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
            .when("/normalGame/:username", {
                controller: "normalgame-ctrl",
                templateUrl: "views/normalgame.html",
                access: { restricted: true }
            })
            .when("/hardGame/:username", {
                controller: "hardgame-ctrl",
                templateUrl: "views/hardgame.html",
                access: { restricted: true }
            })
            .when("/profile/:username", {
                controller: "profile-ctrl",
                templateUrl: "views/profile.html",
                access: { restricted: true }
            })
            .when("/ranking", {
                controller: "globalranking-ctrl as vm",
                templateUrl: "views/globalranking.html",
                access: { restricted: true }
            })
            .when("/ranking/:username", {
                controller: "individualranking-ctrl",
                templateUrl: "views/individualranking.html",
                access: { restricted: true }
            })
    })
    //Inicialización Passport
    .config(function($provide, authProvider) {
      authProvider.init({
        domain: 'yoiiii121.eu.auth0.com',
        clientID: 'IR7wby3JE4nJudEgPGcflD4pleLxam5M'
      });
    })  
    .config(['$locationProvider', function($locationProvider) {
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
