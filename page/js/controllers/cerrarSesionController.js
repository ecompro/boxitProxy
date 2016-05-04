/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('boxit')
    .controller('cerrarSesionController', ['$scope', '$http', '$window', 'userData', '$interval',
        function ($scope, $http, $window, userData,$interval) {

            userData.logoff();
            $interval(function () {
                $window.location = "/Iniciarsesion.html";
            },5000);
        }]);