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
        .factory('userData', function ($http,$q) {

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
                   
                    if (result.data.Rows.attributes.IdCliente === undefined) {
                        return result.Data.Rows.attributes.Message;
                    } else {

                        user.IdCliente = result.data.Rows.attributes.IdCliente;
                        user.UserName = result.data.Rows.attributes.UserName;
                        user.UserLastName = result.data.Rows.attributes.UserLastName;
                        user.UserGender = result.data.Rows.attributes.UserGender;
                        user.UserBirthdate = result.data.Rows.attributes.UserBirthdate;
                        user.IdPlataforma = result.data.Rows.attributes.IdPlataforma;
                        user.UserEmail = result.data.Rows.attributes.UserEmail;
                        user.UserPhone = result.data.Rows.attributes.UserPhone;
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
                var defered = $q.defer();
                var promise = defered.promise;
                console.log(JSON.stringify(newUser));
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/updateinfouserboxIt",
                    data: newUser,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    console.log(result.data);
                    if (result.data.attributes.IdCliente === undefined) {
                        defered.resolve(result.data.attributes.Error);
                    } else {
                        defered.resolve(result.data.attributes.Message);
                    }

                }, function error(result) {
                    defered.resolve(result.data);
                });
                return promise;
            };

            factory.activateUser = function (id) {
                var defered = $q.defer();
                var promise = defered.promise;
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
                       defered.resolve(result.data.Data.Rows.attributes);
                }, function error(result) {
                       defered.reject(result.Data)
                });
                return promise;
            };
            return factory;
        });