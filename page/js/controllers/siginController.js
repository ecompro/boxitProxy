/**
 * Created by USRSIS0155 on 28/04/2016.
 */
angular
    .module('boxit')
    .controller('siginController', ['$scope', '$http', '$window', 'ngToast', 'userData',
        function ($scope, $http, $window, ngToast, userData) {
            $scope.today = function () {
                $scope.popup1 = {
                    opened: false
                };
                $scope.UserBirthdate = new Date();
            };
            $scope.today();
            $scope.format = 'yyyy-MM-dd';
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date(2020, 1, 1),
                minDate: new Date(1915,1,1),
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
                        var user = {};
                        user["IdCliente"] = result.data.attributes.IdCliente;
                        user["UserName"] = $scope.username;
                        user["UserLastName"] = $scope.lastname;
                        user["UserGender"] = $scope.UserGender;
                        user["UserBirthdate"] = moment($scope.UserBirthdate).format('YYYY/MM/DD');
                        user["IdPlataforma"] = $scope.IdPlataforma;
                        user["UserEmail"] = $scope.useremail;
                        user["UserPhone"] = $scope.useremail;
                        userData.activateUser(result.data.attributes.IdCliente);
                        userData.updateData(user)
                            .then(function (data) {
                                console.log(data);
                                ngToast.create(data);
                            }).catch(function (err) {
                                console.log(err);
                        });
                        //$window.location = "/Iniciarsesion.html";
                    }
                }, function error(result) {
                    console.log(result.data);
                });
            }
        }]);
