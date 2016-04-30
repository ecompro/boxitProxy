/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var user = {
    IdCliente: "",
    UserName: "",
    UserLastName: "",
    UserGender: "",
    UserBirthdate: "",
    IdPlataforma: "",
    UserEmail: "",
    UserPhone: ""
};

angular.module('boxit')
        .factory('userData', function ($http) {

            var factory = {};

            factory.setData = function (id) {
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/getinfouserboxit",
                    data: {
                        "IdCliente": id

                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {

                    if (result.data.Data.Rows.attributes.IdCliente === undefined) {

                      //alert(JSON.stringify(result.Data.Rows.attributes.Message));
                      return JSON.stringify(result.Data.Rows.attributes.Message);
                    } else {

                        user.IdCliente = result.data.Data.Rows.attributes.IdCliente;
                        user.UserName = result.data.Data.Rows.attributes.UserName;
                        user.UserLastName = result.data.Data.Rows.attributes.UserLastName;
                        user.UserGender = result.data.Data.Rows.attributes.UserGender;
                        user.UserBirthdate = result.data.Data.Rows.attributes.UserBirthdate;
                        user.IdPlataforma = result.data.Data.Rows.attributes.IdPlataforma;
                        user.UserEmail = result.data.Data.Rows.attributes.UserEmail;
                        user.UserPhone = result.data.Data.Rows.attributes.UserPhone;
                       
                    return user;
                    }

                }, function error(result) {
                    console.log(result.data);
                });

            };

            factory.getData = function () {

                return user;
            };

            factory.updateData = function (newUser) {

                //alert(JSON.stringify(newUser));
                var args = {};
                args["IdCliente"] = newUser.IdCliente;
                args["UserName"] = newUser.username;
                args["UserLastName"] = newUser.lastname;
                args["UserGender"] = newUser.UserGender;
                args["UserBirthdate"] = newUser.UserBirthdate;
                args["IdPlataforma"] = newUser.IdPlataforma;
                args["UserEmail"] = newUser.useremail;
                args["UserPhone"] = newUser.useremail;
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/updateinfouserboxIt",
                    data: args,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    if (result.data.attributes.IdCliente === undefined) {
                        return result;
                    } else {
                        return result;
                    }

                }, function error(result) {
                    console.log(result.data);
                });
            };

            factory.activateUser = function (id) {
                
                var args = {};
                 args["IdCliente"] = id;
                   $http({
                    method: "POST",
                    url: "http://localhost:8080/users/activeuserboxit",
                    data: args,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                        return result.data.attributes.Message;
                }, function error(result) {
                    console.log(result.data);
                });
            };
            return factory;
        });