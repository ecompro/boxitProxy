angular
    .module('boxit')
    .controller('shoppingCarController', ['$scope', '$http', '$q', '$anchorScroll', 'userData', '$uibModal', '$localStorage', '$window', '$location', '$interval', '$state',
        function ($scope, $http, $q, $anchorScroll, userData, $uibModal, $localStorage, $window, $location, $interval, $state) {
            var products = [];
            var links = [];
            $scope.subCategories = [];
            $scope.checkout = false;
            $scope.shopping = true;
            $scope.showPagination = false;
            $scope.showImage = true;
            $scope.showCar = false;
            $scope.showCarMessage = false;
            $scope.showCarItems = false;
            $scope.showLoginMessage = false;
            $scope.loading = true;
            $scope.loadMain = true;
            $scope.totalItems = 50;
            $scope.currentPage = 1;
            $scope.amazonLink = "";
            $scope.showSubCategories = false;
            var userObj = userData.getData();
            var id;
            $scope.indexs = userData.getSearchIndex();
            if (userObj != undefined) {
                $scope.UserName = userObj.UserName;
            } else {
                $scope.UserName = "Invitado";
            }
            if (userObj != undefined) {
                id = userObj.IdCliente;
            } else {
                id = 0;
            }
            var getCar = function () {
                userData.getShoppingCar(id).then(function success(result) {
                    refreshCar(result);
                    return result;
                }, function error(result) {
                    console.log(result);
                });
            };
            $scope.doSearch = function () {
                $scope.loadMain = true;
                $scope.showCar = false;
                $scope.currentPage = 1;
                products = [];
                if ($scope.index != null || $scope.index != undefined) {
                    console.log($scope.index);
                    searchProducts().then(function success(result) {
                        $scope.showCarMessage = false;
                        $scope.showImage = false;
                        $scope.Items = products[0];
                        products.reverse();
                        if (products[0] == undefined) {
                            $scope.loadMain = false;
                            $scope.showCar = false;
                            var modalInstance = $uibModal.open({
                                animation: true,
                                templateUrl: 'views/modalCambioClave.html',
                                controller: 'modalCambioClaveController',
                                size: 'sm',
                                resolve: {
                                    mensaje: function () {
                                        var mensaje = {};
                                        mensaje.titulo = "Error en la Busqueda";
                                        mensaje.texto = "La busquedano arrojo resultados";
                                        mensaje.estilo = "alerta";
                                        return mensaje;
                                    }
                                }

                            });
                            modalInstance.closed.then(function (someData) {
                                $scope.loadMain = true;
                                $scope.firstSearch();
                            });
                        } else {
                            $scope.loadMain = false;
                            $scope.showCar = true;
                            $scope.showPagination = true;
                        }
                    });
                } else {
                    $scope.loadMain = false;
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modalCambioClave.html',
                        controller: 'modalCambioClaveController',
                        size: 'sm',
                        resolve: {
                            mensaje: function () {
                                var mensaje = {};
                                mensaje.titulo = "Error en la Busqueda";
                                mensaje.texto = "Por Favor seleccione una categoria.";
                                mensaje.estilo = "alerta";
                                return mensaje;
                            }
                        }

                    });
                    modalInstance.closed.then(function (someData) {
                        $scope.loadMain = true;
                        $scope.firstSearch();
                    });
                }
            };
            function searchProducts() {
                //console.log($scope.subCategory.SubCategoryName);
//                    var defered = $q.defer();
//                    var promise = defered.promise;
//                    var i = 1;
//                    for (i = 1; i < 6; i++) {
//                        var searchParams = {};
//                        searchParams["Keywords"] = $scope.keyword;
//                        searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
//                        searchParams["ItemPage"] = i;
//                        callPages(searchParams).then(function success(result) {
//                            products.push(result);
//                            defered.resolve("success");
//
//                        });
//                    }
//                    return promise;

                var promises = [];
                var i;
                for (i = 1; i < 6; i++) {
                    var defered = $q.defer();
                    if ($scope.keyword != undefined) {
                        var searchParams = {};
                        searchParams["Keywords"] = $scope.keyword;
                        searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
                        searchParams["ItemPage"] = i;
                        defered.resolve(callPages(searchParams).then(function success(result) {

                            if (result !== undefined && result !== null) {
                                products.push(result);
                                //var test = [];
                                result;

                                result.forEach(
                                    function (item) {

                                        console.log(item.ItemId);


                                    }
                                );

                            }


                            //defered.resolve('success');

                        }, function error(result) {
                            console.log(result);
                            // defered.resolve('success');
                        }));


                        promises.push(defered.promise);
                    } else {

                        var searchParams = {};
                        searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
                        searchParams["ItemPage"] = i;
                        var IdCliente = 1;

                        if (userData.getData() !== undefined) {
                            IdCliente = userData.getData().IdCliente;
                        }
                        searchParams["IdCliente"] = IdCliente;
                        defered.resolve(userData.getDefaultSearch(searchParams).then(function success(result) {
                            if (result !== undefined) {
                                products.push(result);
                            }
                        }, function error(result) {
                            console.log(result);
                        }));
                        promises.push(defered.promise);
                    }
                }
                return $q.all(promises);

            }


            function callPages(params) {
                var defered = $q.defer();
                var promise = defered.promise;
                $http({
                    method: "POST",
                    url: userData.getHost() + "/amazon/amazongetkeywords",
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {


                    defered.resolve(result.data.Item);
                }, function error(result) {
                    defered.reject(result.data);
                });
                return promise;
            }

            $scope.pageChanged = function () {
                $scope.Items = products[$scope.currentPage - 1];
                $location.hash('top');
                $anchorScroll();
            };
            $scope.initIndex = function () {
                if ($scope.indexs == undefined) {
                    userData.setSearchIndex();
                    $interval(function () {
                        $scope.indexs = userData.getSearchIndex();
                    }, 1500);
                }
            };
            $scope.viewItem = function (item) {
                userData.getItemDetails(item.ItemId).then(function success(result) {
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'views/modalDetallesArticulo.html',
                        controller: 'modalDetallesArticulosController',
                        size: 'lg',
                        resolve: {
                            item: function () {
                                return result;
                            }
                        }
                    });
                }, function error(result) {
                    console.log(result);
                });
            };
            $scope.onKeyEnterPress = function (event) {
                if (event.keyCode === 13) {
                    $scope.doSearch();
                }
            };
            $scope.showShoppingCar = function () {
                $state.go('modal');
            };
            $scope.goBack = function () {
                history.back();
            };
            $scope.closeModal = function () {
                $localStorage.modalIns.close();
            };
            var getItemLink = function (id) {
                var defered = $q.defer();
                var promise = defered.promise;
                userData.getItemDetails(id).then(function success(result) {
                    defered.resolve(result.Item.PageUrl);
                }, function error(result) {
                    defered.reject(result);
                });
                return promise;
            };
            var itemLinks = function () {

                //var promise = defered.promise;
                var promises = [];
                var i;
                for (i = 0; i < $scope.carItems.length; i++) {
                    var defered = $q.defer();
                    var items = $scope.carItems[i];
                    defered.resolve(getItemLink(items.ItemId).then(function success(result) {
                        links.push(result);


                    }, function error(result) {
                        console.log(result);
                        // defered.resolve('success');
                    }));
                    promises.push(defered.promise);
                }
                return $q.all(promises);
            };
            $scope.purchase = function () {
                var promises = [];
                links = [];
                var IdCliente = userData.getData().IdCliente;
                itemLinks().then(function success(result) {


                    for (var i = 0; i < $scope.carItems.length; i++) {


                        var item = $scope.carItems[i];
                        var args = {};
                        args["IdCliente"] = IdCliente;
                        //descripcion del producto
                        args["Package"] = item.Title;
                        //link al producto en amazon
                        args["Link"] = links[i];
                        //cantidad de unidades
                        args["Quantity"] = item.Quantity;
                        //precio de la unidad
                        args["Amount"] = item.Price.Amount;
                        // console.log(args);


                        promises.push(itemCheckOut(args));
                    }
                });
                clearCar(IdCliente);
                $scope.checkout = true;
                $scope.shopping = false;
                $state.go("checkoutmessage")
                //$window.location = '/BoxitStore.html#/checkoutmessage';
                return $q.all(promises);
            };
            var itemCheckOut = function (params) {

                var defered = $q.defer();
                var promise = defered.promise;

                $http({
                    method: "POST",
                    url: userData.getHost() + "/users/insertpurchaseorder",
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    defered.resolve(result.data.Rows.attributes.Message);
                }, function error(result) {
                    console.log(result.data.Rows.attributes.Message);
                    defered.reject(result.data.Rows.attributes.Message);
                });

                return promise;
            };
            var clearCar = function (IdCliente) {

                var defered = $q.defer();
                var promise = defered.promise;
                var params = {};
                params["IdCliente"] = IdCliente;
                $http({
                    method: "POST",
                    url: userData.getHost() + "/amazon/amazonclearcart",
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    defered.resolve(result.data);
                }, function error(result) {
                    defered.reject(result.data);
                });
                return promise;

            };
            $scope.openAmazon = function () {
                if ($scope.amazonLink === "") {
                    return "";
                } else {
                    $window.open($scope.amazonLink, '_blank');
                }


            };
            $scope.addToCar = function (id) {

                if (userObj != undefined) {
                    var args = {};
                    args["IdCliente"] = userData.getData().IdCliente;
                    args["ItemId"] = id;
                    args["Quantity"] = "1";
                    userData.addItemToCar(args).then(function success(result) {
                        refreshCar(result);
                    }, function error(error) {
                        console.log(error);
                    });
                } else {
                    $scope.showShoppingCar();
                }
            };
            var refreshCar = function (result) {
                $scope.showCarItems = false;
                $scope.showLoginMessage = false;
                $scope.loading = true;
                //   console.log(result.data.Data.Cart);
                if (result.data.Data.Cart != undefined) {
                    if (result.data.Data.Cart.CartItems != undefined || result.data.Data.Cart.CartItems != null) {
                        if (null !== result.data.Data.Cart.CartItems) {
                            if ($.isArray(result.data.Data.Cart.CartItems.CartItem)) {
                                $scope.carItems = result.data.Data.Cart.CartItems.CartItem;
                            } else {
                                var Items = [];
                                Items.push(result.data.Data.Cart.CartItems.CartItem);
                                $scope.carItems = Items;
                            }
                            $scope.subTotal = result.data.Data.Cart.CartItems.SubTotal.FormattedPrice;
                            $scope.amazonLink = result.data.Data.Cart.PurchaseURL;
                            $scope.carNumber = calcularTotal($scope.carItems);
                            angular.element(document.getElementById('cartNumber')).scope().carNumber = $scope.carNumber;
                        } else {
                            getCar();
                        }
                    } else {
                        $scope.carNumber = 0;
                        angular.element(document.getElementById('cartNumber')).scope().carNumber = $scope.carNumber;
                        $scope.subTotal = 0;
                        $scope.showEmptyMessage
                    }
                } else {
                    $scope.subTotal = 0;
                    $scope.carNumber = 0;
                    angular.element(document.getElementById('cartNumber')).scope().carNumber = $scope.carNumber;
                    $scope.showCarItems = false;
                    if (userObj == undefined) {
                        $scope.showLoginMessage = true;
                    }
                }
            };
            $scope.modifyCar = function (op, carItemId, cantidad) {
                var args = {};
                args["IdCliente"] = userData.getData().IdCliente;
                args["CartItemId"] = carItemId;
                if (op == 0) {
                    args["Quantity"] = (parseInt(cantidad) - 1).toString();
                } else {
                    args["Quantity"] = (parseInt(cantidad) + 1).toString();
                }
                $http({
                    method: "POST",
                    url: userData.getHost() + "/amazon/amazonmodifycart",
                    data: args,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    $scope.$parent.subTotal = result.data.Data.Cart.CartItems.SubTotal.FormattedPrice;
                    refreshCar(result);
                }, function error(result) {
                    console.log(result);
                });
            };
            $scope.firstSearch = function () {
                userData.getFirstSearch().then(function success(result) {
                    $scope.loadMain = false;
                    $scope.Items = result;
                    $scope.showCar = true;
                    $scope.showImage = false;
                }, function error(result) {
                });
            };
            $scope.clearShoppingCar = function () {
                clearCar(userObj.IdCliente).then(function success(result) {
                    var obj = {};
                    obj["data"] = result;
                    refreshCar(obj);
                    angular.element(document.getElementById('cartNumber')).scope().carNumber = 0;
                    $scope.closeModal();
                });
            };
            getCar();
            function calcularTotal(carItems) {
                var totalAcumulado = 0;
                for (var i = 0; i < carItems.length; i++) {
                    var item = carItems[i];
                    totalAcumulado = totalAcumulado + parseInt(item.Quantity);
                }
                return totalAcumulado;
            }

            function getSubCategories(category) {
                var defered = $q.defer();
                var promise = defered.promise;
                $http({
                    method: "POST",
                    url: userData.getHost() + "/amazon/amazongetcategories",
                    data: {
                        "SearchIndex": category
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    defered.resolve(result);
                }, function error(result) {
                    defered.reject(result);
                });
                return promise;
            }

            $scope.setSubCategories = function () {
                getSubCategories($scope.index.attributes.SearchIndex).then(function success(result) {
                    $scope.showSubCategories = true;
                    $scope.subCategories = result.data;
                }, function error(result) {
                    console.log(result);
                });
            };
        }]);
