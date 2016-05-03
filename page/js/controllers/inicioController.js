/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('boxit')
        .controller('inicioController', ['$scope', '$state', 'userData',
            function ($scope, $controller, userData) {

                var init = function () {

                    var user = userData.getData();

                    console.log(JSON.stringify(user));
                     $scope.nombre = user.userMiamiAddress.nombre;
                     $scope.apellido = user.userMiamiAddress.apellido;
                     $scope.address1 = user.userMiamiAddress.address1;
                     $scope.address2 = user.userMiamiAddress.address2;
                     $scope.city = user.userMiamiAddress.city;
                     $scope.state = user.userMiamiAddress.state;
                     $scope.zip = user.userMiamiAddress.zip;
                     $scope.country = user.userMiamiAddress.country;
                     $scope.tel = user.userMiamiAddress.tel;

                };


                init();

            }]);
