/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular
        .module('boxit')
        .controller('activarController', ['$scope', '$http', '$stateParams', 'md5', 'userData', '$uibModal',
            function ($scope, $http, $stateParams, md5, userData, $uibModal) {
                $scope.exitoso = true;

                $scope.init = function () {

                    var hash = $stateParams.hash.split(".");
                    var IdCliente = hash[0];
                    var token = hash[1];
                    var calculatedHash = md5.createHash(IdCliente.toString() + "myBoxIT216" || '');
                    $scope.exitoso = true;

                    if (token === calculatedHash){
                        userData.activateUser(IdCliente).then(function success(result){
                            var respuesta = "Hubo un error en la activación del usuario, intente mas tarde o contactenos.";
                            
                            if(result = "Success"){
                                respuesta ="El usuario fue activado con exito, por favor inicie sesión.";
                                
                                
                            }
                            $scope.mensaje = respuesta;
                            
                        }
                        , function error(result){
                            $scope.mensaje = result;
                            
                        });
                    }else{
                          var respuesta = "Hubo un error en la activación del usuario, intente mas tarde o contactenos.";
                            $scope.mensaje = respuesta;
                    }
                };



                $scope.init();


            }]);
