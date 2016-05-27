/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('boxit')
        .controller('cerrarSesionController', ['$scope', '$http', '$window', 'userData', '$interval',
            function ($scope, $http, $window, userData, $interval) {

                userData.logoff();
                $scope.$emit('estadoSesion', {
                    estado: true
                });
                $interval(function () {
                    $window.location = "/Iniciarsesion.html";
                }, 3000);
            }]);