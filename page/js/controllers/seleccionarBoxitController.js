/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('boxit')
        .controller('seleccionarBoxitController', ['$scope','$http', 'userData','ngToast',
    function($scope,$http,userData,ngToast) {
        
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
          
            
             var oldUser = userData.getData();
                var user = {};
                user["IdCliente"] = oldUser.IdCliente;
                user["UserName"] = oldUser.username;
                user["UserLastName"] = oldUser.lastname;
                user["UserGender"] = oldUser.UserGender;
                user["UserBirthdate"] = oldUser.UserBirthdate;
                user["IdPlataforma"] = $scope.descPlataforma.attributes.IdPlataforma;
                user["UserEmail"] = oldUser.UserEmail;
                user["UserPhone"] = oldUser.UserPhone;
            //user.IdPlataforma = $scope.descPlataforma.attributes.IdPlataforma;
            
            alert(JSON.stringify(user));
          alert( JSON.stringify(userData.updateData(user)));
            
        };
        
    } ]);

