/**
 * Created by USRSIS0155 on 28/04/2016.
 */
angular
        .module('boxit')
        .controller('siginController', ['$scope', '$http', '$window', 'userData', '$interval', '$uibModal',
            function ($scope, $http, $window, userData, $interval, $uibModal) {
                $scope.today = function () {
                    $scope.popup1 = {
                        opened: false
                    };
                    $scope.UserBirthdate = new Date();
                };
                $scope.today();
                $scope.format = 'dd/MM/yyyy';
                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yyyy',
                    maxDate: new Date(2020, 1, 1),
                    minDate: new Date(1915, 1, 1),
                    startingDay: 1
                };
                $scope.plataformas = [];
                $http({
                    method: "POST",
                    url: userData.getHost() + "/users/getplataformas",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(results) {
                    $scope.plataformas = results.data;
                }, function error(results) {
                    console.log(results.data);
                });
                $scope.open = function () {
                    $scope.popup1.opened = true;
                };
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.Sigin = function () {
                    var args = {};

                    if (!($scope.password === $scope.confirmarpassword)) {
                        //  ngToast.create("Password no coincide");

                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modalCambioClave.html',
                            controller: 'modalCambioClaveController',
                            size: 'sm',
                            resolve: {
                                mensaje: function () {
                                    var mensaje = {};
                                    mensaje.titulo = "Registro Usuario";
                                    mensaje.texto = "Password no coincide";
                                    mensaje.estilo = "alerta";
                                    return mensaje;
                                }
                            }

                        });




                        return "";
                    }
                    args["UserName"] = $scope.username;
                    args["UserLastName"] = $scope.lastname;
                    args["UserEmail"] = $scope.useremail;
                    args["UserPassword"] = $scope.password;
                    args["UserGender"] = $scope.UserGender;
                    args["UserBirthdate"] = moment($scope.UserBirthdate).format('YYYY/MM/DD');
                    args["IdPlataforma"] = $scope.descPlataforma != null ?
                            $scope.descPlataforma.attributes.IdPlataforma : null;
                    args["Phone"] = $scope.Phone        
                    var respuesta = "";
                    $http({
                        method: "POST",
                        url: userData.getHost() + "/users/insertuserboxit",
                        data: args,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function success(result) {
                        if (result.data.attributes.IdCliente === undefined) {

                            respuesta = result.data.attributes.Message;
                            var estilo = "alerta";
                            if ("The User Has Been Created" === respuesta) {
                                respuesta = "Se ha creado el usuario";
                                estilo = "exito";
                            } else if ("The User Could Not be Created" === respuesta) {
                                respuesta = "No se ha  podido crear el usuario";
                            } else if ("UserEmail Already Exists" === respuesta) {
                                respuesta = "El usuario ya existe";
                            } else if ("UserName is required" === respuesta) {
                                respuesta = "El nombre del usuario es requerido";
                            } else if ("UserLastName is required" === respuesta) {
                                respuesta = "El apellido del usuario es requerido";
                            } else if ("UserLastName length is invalid" === respuesta) {
                                respuesta = "La longitud del apellido es invalida";
                            } else if ("UserPassword length is invalid" === respuesta) {
                                respuesta = "La longitud del password es invalida";
                            } else if ("UserEmail is required" === respuesta) {
                                respuesta = "El correo es requerido";
                            } else if ("User email length is invalid" === respuesta) {
                                respuesta = "La longitud del correo es invalida";
                            } else if ("UserEmail invalid format" === respuesta) {
                                respuesta = "El formato del correo es invalido";
                            } else if (respuesta === "IdPlataforma is required") {
                                respuesta = "Debe seleccionar plataforma";
                            } else if (respuesta === "Phone is required"){
                                respuesta = "El numero de telefono es requerido";
                            }


                            // ngToast.create(JSON.stringify(result.data.attributes.Message));
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Registro Usuario";
                                        mensaje.texto = respuesta;
                                        mensaje.estilo = estilo;
                                        return mensaje;
                                    }
                                }

                            });





                        } else {

                            // userData.activateUser(result.data.attributes.IdCliente);

                            respuesta = "Usted recibirá un correo de confirmación de cuenta. \n\
                            Para continuar debe confirmar su registro a través del email recibido";

                            estilo = "exito";
                            $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Registro Usuario";
                                        mensaje.texto = respuesta;
                                        mensaje.estilo = estilo;
                                        return mensaje;
                                    }
                                }
                            });
                        }

                    }
                    , function error(result) {
                        console.log(result.data);
                    }
                    );
                };
            }]);
