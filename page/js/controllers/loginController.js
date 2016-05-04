angular
    .module('boxit')
    .controller('loginController', ['$scope', '$http', '$window', 'userData', 'ngToast', '$interval',
        function ($scope, $http, $window, userData, ngToast, $interval) {

            if (!(userData.getData() === undefined)) {
                $window.location = "/userInterface.html";

            }


            $scope.Login = function () {

                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/loginuserboxit",
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

                        ngToast.create(JSON.stringify(result.data.Rows.attributes.Message));
                    }
                    else {
                        //alert(JSON.stringify(result.data));
                        //var test = userData.getData();
                        var id = result.data.Rows.attributes.IdCliente;
                        userData.setData(id).then(function () {
                            ngToast.create(JSON.stringify(userData.getData()));
                            $interval(function () {
                                $window.location = "/userInterface.html";
                            },5000);
                        });

                    }

                }, function error(result) {
                    console.log(result.data);
                });
            };
        }]);
