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
                var defered = $q.defer();
                var promise = defered.promise;
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

                    if (result.data.Rows.attributes.AddressMiami === undefined) {
                       defered.resolve( result.data.Rows.attributes.Message);
                    } else {


                        var rawAddress = result.data.Rows.attributes.AddressMiami;
                        var splitAddress = rawAddress.split("\r\n");

                        var miamiAddress = {
                            nombre: "",
                            apellido: "",
                            address1: "",
                            address2: "",
                            city: "",
                            state: "",
                            zip: "",
                            country: "",
                            tel: ""

                        };
                       
                        miamiAddress.nombre = splitAddress[0].toString().replace("NOMBRE:", "");
                        miamiAddress.apellido = splitAddress[1].toString().replace("APELLIDO:", "");
                        miamiAddress.address1 = splitAddress[2].toString().replace("ADDRESS 1:", "");
                        miamiAddress.address2 = splitAddress[3].toString().replace("ADDRESS 2:", "");
                        miamiAddress.city = splitAddress[4].toString().replace("CITY:", "");
                        miamiAddress.state = splitAddress[5].toString().replace("STATE/PROVINCIA/REGION:", "");
                        miamiAddress.zip = splitAddress[6].toString().replace("ZIP CODE:", "");
                        miamiAddress.country = splitAddress[7].toString().replace("CITY:", "");
                        miamiAddress.tel = splitAddress[8].toString().replace("TEL:", "");

                        user.userMiamiAddress = miamiAddress;
                       
                        defered.resolve(user.userMiamiAddress);
                    }

                }, function error(result) {
                    defered.reject( result.data);
                });
                return promise;
            };

            factory.setData = function (id) {
                var defered = $q.defer();
                var promise = defered.promise;
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
                        defered.resolve(result.Data.Rows.attributes.Message);
                    } else {


                        user.IdCliente = result.data.Rows.attributes.IdCliente;
                        user.UserName = result.data.Rows.attributes.UserName;
                        user.UserLastName = result.data.Rows.attributes.UserLastName;
                        user.UserGender = result.data.Rows.attributes.UserGender;
                        user.UserBirthdate = result.data.Rows.attributes.UserBirthdate;
                        user.IdPlataforma = result.data.Rows.attributes.IdPlataforma;
                        user.UserEmail = result.data.Rows.attributes.UserEmail;
                        user.UserPhone = result.data.Rows.attributes.UserPhone;
                        user.userMiamiAddress = factory.getMiamiAddress(user.IdCliente);

                        defered.resolve(user);


                    }

                }, function error(result) {
                    defered.reject(result.data);
                });
                return promise;
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
                    defered.reject(result.Data);
                });
                return promise;
            };
            return factory;
        });