/**
 * Created by USRSIS0155 on 28/04/2016.
 */
angular
    .module('boxit')
    .controller('siginController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.Sigin = function () {
                var args = {};
                args["UserName"] = $scope.username;
                args["UserLastName"] = $scope.lastname;
                args["UserEmail"] = $scope.useremail;
                args["UserPassword"] = $scope.password;
                args["IdPlataforma"] = null;
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/insertuserboxit",
                    data: null,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    if(result.data.Rows.attributes.IdCliente === undefined) {
                        alert(JSON.stringify(result.data.Rows.attributes.Message));
                    }
                    else {
                        //alert(JSON.stringify(result.data));
                        //var test = userData.getData();
                        var id = result.data.Rows.attributes.IdCliente;
                        userData.setData(id);

                    }

                },function error(result) {
                    console.log(result.data);
                });
            }
        }]);
