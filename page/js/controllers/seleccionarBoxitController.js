/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('boxit')
        .controller('seleccionarBoxitController', ['$scope','$http', 'userData',
    function($scope,$http,userData) {
        
        $scope.plataformas = [];
            $http({
                method: "POST",
                url: "http://localhost:8080/users/getplataformas",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(results) {
                //alert(JSON.stringify(results.data));
                $scope.plataformas = results.data;
            }, function error(results) {
                console.log(results.data);
            });
        $scope.Update = function() {
          
            var user = userData.getData();
            user.IdPlataforma = $scope.IdPlataforma;
            userData.updateData(user);
            
        };
        
    } ]);

