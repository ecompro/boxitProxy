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
    UserPhone: "",
    userMiamiAddress: {
        nombre: "",
        apellido: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        tel: ""
    }
};

angular.module('boxit')
        .factory('userData', function ($http, $q) {

            var factory = {};
            factory.getMiamiAddress = function (id) {
                alert("miamiAddress");
                $http({
                    method: "POST",
                    url: "http://localhost:8080/users/getaddressmiamiuser",
                    data: {
                        "IdCliente": id

                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {

                    if (result.data.Rows.attributes.IdCliente === undefined) {
                        return result.Rows.attributes.Message;
                    } else {
                        var rawAddress = result.Rows.attributes.AddressMiami;
                        var splitAddress = rawAddress.split("\r\n");
                        console.log(splitAddress);
                        user.userMiamiAddress.nombre = splitAddress[0];
                        user.userMiamiAddress.apellidos = splitAddress[1];
                        user.userMiamiAddress.address1 = splitAddress[2];
                        user.userMiamiAddress.address2 = splitAddress[3];
                        user.userMiamiAddress.city = splitAddress[4];
                        user.userMiamiAddress.state = splitAddress[5];
                        user.userMiamiAddress.country = splitAddress[6];
                        user.userMiamiAddress.tel = splitAddress[7];
                    }

                }, function error(result) {
                    console.log(result.data);
                });

            };

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

                        alert("llamada");
                        user.IdCliente = result.data.Rows.attributes.IdCliente;
                        user.UserName = result.data.Rows.attributes.UserName;
                        user.UserLastName = result.data.Rows.attributes.UserLastName;
                        user.UserGender = result.data.Rows.attributes.UserGender;
                        user.UserBirthdate = result.data.Rows.attributes.UserBirthdate;
                        user.IdPlataforma = result.data.Rows.attributes.IdPlataforma;
                        user.UserEmail = result.data.Rows.attributes.UserEmail;
                        user.UserPhone = result.data.Rows.attributes.UserPhone;
                        alert('va a llamar miamiAddress');
                        user.userMiamiAddress = getMiamiAddress(user.IdCliente);
                        alert('llamo miamiAddress');

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