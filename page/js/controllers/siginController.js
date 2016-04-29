/**
 * Created by USRSIS0155 on 28/04/2016.
 */
angular
    .module('boxit')
    .controller('siginController', ['$scope', '$http','$window','ngToast','userData',
        function ($scope, $http,$window,ngToast,userData) {
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
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
            $scope.open = function() {
                $scope.popup1.opened = true;
            };
            $scope.popup1 = {
                opened: false
            };
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }
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
<<<<<<< b59590672c49d439ac22c6b95666e02edd376cf6
                       //alert(JSON.stringify(result.data.attributes.Message)); 
                        var user = $scope;
=======
                       alert(JSON.stringify(result.data.attributes.Message)); 
                        var user = {};
                        user["IdCliente"] = result.data.attributes.IdCliente;
                        user["UserName"] = $scope.username;
                        user["UserLastName"] = $scope.lastname;
                        user["UserGender"] = $scope.UserGender;
                        user["UserBirthdate"] = $scope.UserBirthdate;
                        user["IdPlataforma"] = $scope.IdPlataforma;
                        user["UserEmail"] = $scope.useremail;
                        user["UserPhone"] = $scope.useremail;

>>>>>>> ada0eb97748e0cb093d3050319e4b080afb34811
                        userData.activateUser(result.data.attributes.IdCliente);
                        userData.updateData(user);
                        $window.location = "/Iniciarsesion.html";
                    }

                }, function error(result) {
                    console.log(result.data);
                });
            }
            
            
            
            
            
        }]);
