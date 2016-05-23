angular
    .module('boxit')
    .controller('trakingDePaquetesController', ['$scope', '$http', 'userData',
        function ($scope, $http, userData) {
            $http({
                method: "POST",
                url: userData.getHost() + "/users/gettracking",
                data: {
                    "IdCliente": userData.getData().IdCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(result) {
                $scope.trakings = result.data.Rows;
            }, function error(result) {
                console.log(result);
            });
        }]);
