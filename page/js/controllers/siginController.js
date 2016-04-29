/**
 * Created by USRSIS0155 on 28/04/2016.
 */
angular
    .module('boxit')
    .controller('siginController', ['$scope', '$http','$window','ngToast','userData',
        function ($scope, $http,$window,ngToast,userData) {
            $scope.plataformas = [];
            $http({
                method: "POST",
                url: "http://localhost:8080/users/getplataformas",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(results) {
                $scope.plataformas = results.data;
            }, function error(results) {
                console.log(results.data);
            });
            $scope.Sigin = function () {
              
                var args = {};
                args["UserName"] = $scope.username;
                args["UserLastName"] = $scope.lastname;
                args["UserEmail"] = $scope.useremail;
                args["UserPassword"] = $scope.password;
                args["IdPlataforma"] = $scope.descPlataforma != null ? 
                    $scope.descPlataforma.attributes.IdPlataforma : null;
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/insertuserboxit",
                    data: args,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    if (result.data.attributes.IdCliente === undefined) {
                        ngToast.create(JSON.stringify(result.data.attributes.Message));
                    }
                    else {
                     // ngToast.create(JSON.stringify(result.data.attributes.Message));
                       alert(JSON.stringify(result.data.attributes.Message)); 
                        var user = $scope;
                        userData.activateUser(result.data.attributes.IdCliente);
                        userData.updateData(user);
                        $window.location = "/Iniciarsesion.html";
                    }

                }, function error(result) {
                    console.log(result.data);
                });
            }
            
            
            
            
            
        }]);
