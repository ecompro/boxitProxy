angular.module('boxit', ['ngToast', 'ui.bootstrap', 'ui.router', 'ngStorage'])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/userInterface');
        $stateProvider.state('userMenu', {
            url: '/userInterface',
            templateUrl: 'views/userMenu.html',
            controller: 'userMenuController'
        }).state('userMenu.inicio', {
            url: '/inicio',
            templateUrl: 'views/inicio.html',
            controller: 'inicioController'
        }).state('userMenu.editarPerfil', {
            url: '/editarPerfil',
            templateUrl: 'views/editarPerfil.html',
            controller: 'editarPerfilController'
        }).state('userMenu.modificarContrasena', {
            url: '/modificarContrasena',
            templateUrl: 'views/modificarContrasena.html',
            controller: 'modificarContrasenaController'
        }).state('userMenu.seleccionarBoxIt', {
            url: '/seleccionarBoxIt',
            templateUrl: 'views/seleccionarBoxIt.html',
            controller: 'seleccionarBoxitController'
        }).state('userMenu.anunciarPaquete', {
            url: '/anunciarPaquete',
            templateUrl: 'views/anunciarPaquete.html',
            controller: 'anunciarPaqueteController'
        }).state('userMenu.trakingDePaquetes', {
            url: '/trakingDePaquetes',
            templateUrl: 'views/trakingDePaquetes.html',
            controller: 'trakingDePaquetesController'
        }).state('userMenu.cerrarSesion', {
            url: '/cerrarSesion',
            templateUrl: 'views/cerrarSesion.html',
            controller: 'cerrarSesionController'
        }).state('shoppingCar', {
            url: '/shoppingCar',
            templateUrl: 'views/shoppingCar.html',
            controller: 'shoppingCarController'
        });
    }]);