/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular
    .module('boxit')
    .controller('passwordController', ['$http', 'ngToast', 'userData', '$uibModal',
        function ($scope, $http, ngToast, userData, $uibModal) {
            
            var id = 190;
            $scope.init = function () {
               
            };
            
            $scope.updatePassword = function() {
                
                 $http({
                        method: "POST",
                        url: "/users/updateforgetpassword",
                        data: {
                            "IdCliente": id,
                            "UserPasswordNew": $scope.password
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function success(){
                        
                        
                    },function error(){
                        
                        
                        
                        
                    });
            };
                
               
        }]);
