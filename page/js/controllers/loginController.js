angular
        .module('boxit')
        .controller('loginController', ['$scope', '$http', '$window', 'userData', '$interval','$uibModal',
                function ($scope, $http, $window, userData, $interval,$uibModal) {

                if (!(userData.getData() === undefined)) {
                $window.location = "/userInterface.html";
                }
                $scope.Login = function () {

                $http({
                method: "POST",
                        url: "/users/loginuserboxit",
                        data: {
                        "UserEmail": $scope.username,
                                "UserPassword": $scope.password
                        },
                        headers: {
                        'Content-Type': 'application/json'
                        }
                }).then(function success(result) {
                if (result.data.Rows.attributes.IdCliente === undefined) {
                //alert(JSON.stringify(result.data.Rows.attributes.Message));

                // ngToast.create(JSON.stringify(result.data.Rows.attributes.Message));
                        var respuesta = result.data.Rows.attributes.Message;
                        if("Invalid BoxIt User") {
                            respuesta = "Usuario invalido o clave invalida";
                        }else if("UserEmail is required"){
                            respuesta = "El correo es requerido";
                        }else if("UserEmail length is invalid"){
                            respuesta = "El correo es requerido";
                        }else if("UserEmail invalid format"){
                            respuesta = "El correo es requerido";
                        }else if (" UserPassword is required"){
                            respuesta = "El correo es requerido";
                        }else if ("UserPassword length is invalid"){
                            respuesta = "Longitud del password invalida";
                        }
                        
                        
                               $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modalCambioClave.html',
                            controller: 'modalCambioClaveController',
                            size: 'sm',
                            resolve: {
                                mensaje: function () {
                                    var mensaje = {};
                                    mensaje.titulo = "Inicio de sesion";
                                    mensaje.texto = respuesta;
                                    return mensaje;
                                }
                            }

                        });

                        
                       
                        




                }
                else {
                //alert(JSON.stringify(result.data));
                //var test = userData.getData();
                var id = result.data.Rows.attributes.IdCliente;
                        userData.setData(id).then(function () {
                //ngToast.create(JSON.stringify(userData.getData()));
                $interval(function () {
                $window.location = "/userInterface.html";
                }, 3000);
                });
                }

                }, function error(result) {
                console.log(result.data);
                });
                };
                }]);
