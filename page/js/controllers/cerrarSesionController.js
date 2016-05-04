/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('boxit')
        .controller('cerrarSesionController', ['$scope','$http','$window', 'userData',
    function($scope,$http,$window,userData) {
        
            userData.logoff();
            $window.location = "/Iniciarsesion.html";
            
    } ]);