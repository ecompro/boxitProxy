angular
    .module('boxit')
    .controller('loginController', ['$scope', '$http','$window','userData','ngToast',
        function ($scope, $http, $window,userData,ngToast) {
            $scope.Login = function () {
                console.log("hola");
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
                //alert(JSON.stringify(result.data.Rows.attributes.Message));
                console.log("hola2");
                ngToast.create(JSON.stringify(result.data.Rows.attributes.Message));
              }
              else {
                  //alert(JSON.stringify(result.data));
                  //var test = userData.getData();
                  var id = result.data.Rows.attributes.IdCliente;
                  userData.setData(id);
                  setTimeout( function() { 
                      console.log("impre toast");
                      ngToast.create(userData.getData()); }, 2000)  ;
             //   $window.location = "/userInterface.html";
                 
              }
            
            },function error(result) {
                  console.log(result.data);
                });
            };
        }]);
