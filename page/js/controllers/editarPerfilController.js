/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('boxit')
    .controller('editarPerfilController', ['$scope', 'userData','ngToast',
        function ($scope, userData,ngToast) {

            $scope.init = function () {
                var user = userData.getData();
                $scope.username = user.UserName;
                $scope.lastname = user.UserLastName;
             //   $scope.UserBirthdate = user.UserBirthdate;
                $scope.UserGender = user.UserGender;
                $scope.UserPhone = user.UserPhone;
                $scope.UserEmail = user.UserEmail;            };

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
               // console.log( new Date());
                $scope.UserBirthdate = user.UserBirthdate;// moment($scope.UserBirthdate).format('YYYY/MM/DD');
                //console.log();
            };
            $scope.init();
            $scope.today();

            $scope.format = 'yyyy/MM/dd';
            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                maxDate: new Date(2020, 1, 1),
                minDate: new Date(1915, 1, 1),
                startingDay: 1
            };

            $scope.Update = function () {

                var oldUser = userData.getData();
                var user = {};
                user["IdCliente"] = oldUser.IdCliente;
                user["UserName"] = $scope.username;
                user["UserLastName"] = $scope.lastname;
                user["UserGender"] = $scope.UserGender;
                user["UserBirthdate"] = moment($scope.UserBirthdate).format('YYYY/MM/DD');
                user["IdPlataforma"] = oldUser.IdPlataforma;
                user["UserEmail"] = $scope.UserEmail;
                user["UserPhone"] = $scope.UserPhone;

                userData.updateData(user)
                    .then(function (data) {
                        //alert(data);
                          ngToast.create(data);
                        console.log(data);
                    }).catch(function (err) {
                    console.log(err);
                });

            };
        }]);
