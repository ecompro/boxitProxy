/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var user = {
    id : ""
    
    
};

angular.module('boxit')
        .factory('userData',function(){
            
            var factory = {};
            
            factory.setData = function(newUser){
                user = newUser;
                
            };
            
            factory.getData = function (){
                
                return user;
            };
            
            return factory;
        });