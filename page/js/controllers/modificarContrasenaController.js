/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('boxit')
        .controller('modificarContrasenaController', ['$scope', '$http', 'ngToast', 'userData',
            function ($scope, $http, ngToast, userData) {

                $scope.Update = function () {

                    var user = userData.getData();
                    $scope.Login = function () {
                        if (!($scope.password === $scope.confirmarpassword)) {
                            ngToast.create("Password no coincide");
                            return "";
                        }
                        $http({
                            method: "POST",
                            url: "http://localhost:8080/users/updatepassworduserboxit",
                            data: {
                                "IdCliente": user.IdCliente,
                                "UserPasswordOld": $scope.oldpassword,
                                "UserPasswordNew": $scope.newpassword
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function success(result) {
                            
                                ngToast.create(JSON.stringify(result.data.Rows.attributes.Message));
                          
                        }, function error(result) {
                            console.log(result.data);
                        });
                    };
                };

            }]);


