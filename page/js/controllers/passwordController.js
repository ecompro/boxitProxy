/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular
        .module('boxit')
        .controller('passwordController', ['$scope', '$http', '$stateParams', 'md5', 'userData', '$uibModal',
            function ($scope, $http, $stateParams, md5, userData, $uibModal) {
                $scope.exitoso = true;

                $scope.reset = function () {

                    var hash = $stateParams.hash.split(".");
                    var IdCliente = hash[0];
                    var token = hash[1];
                    var calculatedHash = md5.createHash(IdCliente.toString() + "myBoxIT216" || '');
                    $scope.exitoso = true;

                    if (token === calculatedHash) {
                        if (!($scope.password === $scope.confirmPassword)) {
                            // ngToast.create("Password no coincide");
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Regenerar Contraseña";
                                        mensaje.texto = "Nueva contraseña no coincide";
                                        return mensaje;
                                    }
                                }

                            });

                            return;
                        }

                        var args = {};
                        args["IdCliente"] = IdCliente;
                        args["UserPasswordNew"] = $scope.password;
                        $http({
                            method: "POST",
                            url: "/amazon/updateforgetpassword",
                            data: args,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function success(result) {
                            // defered.resolve(result)
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Regenerar Contraseña";
                                        mensaje.texto = result;
                                        mensaje.estilo = "exito";
                                        return mensaje;
                                    }
                                }

                            });



                        }, function error(result) {
                            // defered.reject(result)
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Regenerar Contraseña";
                                        mensaje.texto = result.data;
                                        mensaje.estilo = "alerta";
                                        return mensaje;
                                    }
                                }

                            });

                        });

                    } else {
                        //var respuesta = "Hubo un error en la activación del usuario, intente mas tarde o contactenos.";
                        // $scope.mensaje = respuesta;

                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modalCambioClave.html',
                            controller: 'modalCambioClaveController',
                            size: 'sm',
                            resolve: {
                                mensaje: function () {
                                    var mensaje = {};
                                    mensaje.titulo = "Regenerar Contraseña";
                                    mensaje.texto = "Ruta invalida";
                                    mensaje.estilo = "alerta";
                                    return mensaje;
                                }
                            }

                        });

                        return;

                    }
                };




            }]);
