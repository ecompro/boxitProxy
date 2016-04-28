angular
    .module('boxit')
    .controller('loginController', ['$scope', '$http',
        function ($scope, $http) {
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
                  alert(result.data.Rows.attributes.Message)
                },function error(result) {
                  console.log(result.data);
                });
            }
        }]);
