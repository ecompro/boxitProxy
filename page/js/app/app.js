angular.module('boxit', ['ngToast', 'ui.bootstrap', 'ui.router'])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/userInterface');
        $stateProvider.state('userMenu', {
            url: '/userInterface',
            templateUrl: 'views/userMenu.html'
        }).state('userMenu.inicio',{
            url:'/inicio',
            templateUrl:'views/inicio.html'
        }).state('userMenu.editarPerfil',{
            url:'/editarPerfil',
            templateUrl:'views/editarPerfil.html'
        })
    }]);