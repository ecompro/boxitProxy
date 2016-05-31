/**
 * Created by USRSIS0155 on 09/05/2016.
 */
angular
        .module('boxit')
        .controller('indexController', ['$scope', 'userData',
            function ($scope, userData) {
               
                $scope.loged = false;
                if (!(userData.getData() === undefined)) {
                    $scope.loged = true;
                }
               
                $scope.$on('estadoSesion', function (event, estado) {
                   alert("evento");
                    $scope.loged = estado.estado;
                    // profileObj contains; name, country and email from emitted event
                });

                $scope.cerrarSesion = function () {
                    //cerrar sesion aca  
                    userData.logoff();
                    $scope.loged = false;

                };
                 $scope.init = function () {
                    userData.setSearchIndex();
                };

            }]);
