/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('boxit')
        .controller('editarPerfilController', ['$scope', 'userData',
            function ($scope, userData) {

                $scope.open = function () {
                    $scope.popup1.opened = true;
                };
                function disabled(data) {
                    var date = data.date,
                            mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

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
                    minDate: new Date(1915, 1, 1),
                    startingDay: 1
                };
                $scope.Update = function () {

                   var  oldUser =  userData.getData();
                    var user = {};
                    user["IdCliente"] = oldUser.IdCliente;
                    user["UserName"] = $scope.username;
                    user["UserLastName"] = $scope.lastname;
                    user["UserGender"] = $scope.UserGender;
                    user["UserBirthdate"] = moment($scope.UserBirthdate).format('YYYY/MM/DD');
                    user["IdPlataforma"] = $scope.IdPlataforma;
                    user["UserEmail"] = $scope.useremail;
                    user["UserPhone"] = $scope.useremail;
                   
                    userData.updateData(user)
                            .then(function (data) {
                                console.log(data);
                                //  ngToast.create(data);
                            }).catch(function (err) {
                        console.log(err);
                    });

                }


            }]);
