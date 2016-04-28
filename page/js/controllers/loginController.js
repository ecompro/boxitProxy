angular
    .module('boxit')
    .controller('loginController', ['$scope', '$http',
        function ($scope, $http,userData) {
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
            if(result.data.Rows.attributes.IdCliente === undefined) {        
                  alert(JSON.stringify(result.data.Rows.attributes.Message));
              }
              else {
                  alert(JSON.stringify(result.data));
                  var user = userData.getData();
                  user.id = result.data.Rows.attributes.IdCliente;
                  userData.setData(user);
              }
            
            },function error(result) {
                  console.log(result.data);
                });
            }
        }]);
