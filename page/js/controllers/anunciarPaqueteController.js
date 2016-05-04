/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('boxit')
        .controller('anunciarPaqueteController', ['$scope', '$http', 'ngToast', 'userData',
            function ($scope, $http, ngToast, userData) {

              $scope.anunciar = function(){
                  var user = userData.getData();
                   $http({
                method: "POST",
                url: "/users/insertclientalert",
                data:{
                     "IdCliente": user.IdCliente,
                     "TrackingNumber" : $scope.TrackingNumber,
                     "Shop"  : $scope.Shop,
                     "Value" :$scope.Value,
                     Description : $scope.Description
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(results) {
                alert(JSON.stringify(JSON.stringify(results.data.Data.Rows.attributes.Message)));
              // ngToast.create(JSON.stringify(results.data.Data.Rows.attributes.Message));
               $scope.TrackingNumber = "";
               $scope.Shop = "";
               $scope.Value = "";
               $scope.Description = "";
            }, function error(results) {
                console.log(results.data);
            });
                  
              };
            }]);


