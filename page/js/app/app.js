angular.module('boxit', ['ngToast','ui.bootstrap','ui.router'])
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/userInterface');
    $stateProvider.state('userMenu', {
        url: '/userMenu',
        templateUrl: 'viewa/userMenu.html'
    })}]);