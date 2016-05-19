angular
    .module('boxit')
    .controller('shoppingCarController', ['$scope', '$http', '$q', '$anchorScroll', 'userData', '$uibModal', '$localStorage', '$window', '$location', '$interval',
        function ($scope, $http, $q, $anchorScroll, userData, $uibModal, $localStorage, $window, $location, $interval) {
               var products = [];
            var links = [];
            $scope.checkout = false;
            $scope.shopping = true;
            $scope.showPagination = false;
            $scope.showImage = true;
            $scope.showCar = false;
            $scope.showCarMessage = false;
            $scope.showCarItems = true;
            $scope.showLoginMessage = false;
            $scope.totalItems = 50;
            $scope.currentPage = 1;
            var userObj = userData.getData();
            if (userObj != undefined) {
                $scope.UserName = userObj.UserName;
            } else {
                $scope.UserName = "Invitado";
            }
            var id;
            if (userObj != undefined) {
                id = userObj.IdCliente;
            } else {
                id = 0;
            }
            $scope.indexs = userData.getSearchIndex();
            var getCar = function () {
                userData.getShoppingCar(id).then(function success(result) {
                    refreshCar(result);
                    return result;
                }, function error(result) {
                    console.log(result);
                });
            };
            getCar();
            $scope.doSearch = function () {
                products = [];
                searchProducts().then(function success(result) {
                    $scope.showCarMessage = false;
                    $scope.showImage = false;
                    $scope.Items = products[0];
                    console.log(products);
                    console.log(products.length);
                    if (products[0] == undefined) {
                        $scope.showCar = false;
                        $scope.showCarMessage = true;
                    } else {
                        $scope.showCar = true;
                        $scope.showPagination = true;
                    }
                });
            };
            function searchProducts() {
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
                for (i = 0; i < 6; i++) {
                    var defered = $q.defer();
                    if ($scope.keyword != undefined) {
                        var searchParams = {};
                        searchParams["Keywords"] = $scope.keyword;
                        searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
                        searchParams["ItemPage"] = i;
                        defered.resolve(callPages(searchParams).then(function success(result) {

                            if (result !== undefined) {
                                products.push(result);
                            }
                            //defered.resolve('success');

                        }, function error(result) {
                            console.log(result);
                            // defered.resolve('success');
                        }));
                        promises.push(defered.promise);
                    } else {
                        defered.resolve(userData.getDefaultSearch().then(function success(result) {
                            if (result !== undefined) {
                                products.push(result);
                            }
                        },function error(result) {
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
                    url: "/amazon/amazongetkeywords",
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
                console.log('entro');
                if ($scope.indexs != undefined) {
                    console.log('Entro en el if');
                    $scope.index = $scope.indexs[0];
                } else {
                    userData.setSearchIndex();
                    $interval(function () {
                        $scope.indexs = userData.getSearchIndex();
                        console.log('entro en el ese');
                        $scope.index = $scope.indexs[0];
                    }, 1500);
                }
            };
            $scope.viewItem = function (item) {
                userData.getItemDetails(item.ItemId).then(function success(result) {
                    console.log(result);
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
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modalShoppingCar.html',
                    size: 'lg',
                    controller: 'shoppingCarController'
                });
                $localStorage.modalIns = modalInstance;
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
                $window.location = '/BoxitStore.html#/checkoutmessage';
                return $q.all(promises);
            };
            var itemCheckOut = function (params) {

                var defered = $q.defer();
                var promise = defered.promise;

                $http({
                    method: "POST",
                    url: "/users/insertpurchaseorder",
                    data: params,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    console.log(result);
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
                    url: "/amazon/amazonclearcart",
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
            $scope.addToCar = function (id) {

                if (userObj != undefined) {
                    var args = {};
                    args["IdCliente"] = userData.getData().IdCliente;
                    args["ItemId"] = id;
                    args["Quantity"] = "1";
                    console.log(args);
                    userData.addItemToCar(args).then(function success(result) {
                        console.log(result);
                        refreshCar(result);
                    }, function error(error) {
                        console.log(error);
                    });
                } else {
                    $scope.showShoppingCar();
                }
            };
            var refreshCar = function (result) {
                $scope.showCarItems = true;
                $scope.showLoginMessage = false;
                console.log(result.data.Data.Cart);
                //   console.log(result.data.Data.Cart);
                if (result.data.Data.Cart != undefined) {
                    if (result.data.Data.Cart.CartItems != undefined) {
                        if (null !== result.data.Data.Cart.CartItems) {
                            if ($.isArray(result.data.Data.Cart.CartItems.CartItem)) {
                                $scope.carItems = result.data.Data.Cart.CartItems.CartItem;
                            } else {
                                var Items = [];
                                Items.push(result.data.Data.Cart.CartItems.CartItem);
                                $scope.carItems = Items;
                            }
                            $scope.subTotal = result.data.Data.Cart.CartItems.SubTotal.FormattedPrice;
                            $scope.carNumber = $scope.carItems.length;
                        } else {
                            getCar();
                        }
                    } else {
                        $scope.carNumber = 0;
                        $scope.subTotal = 0;
                    }
                }
                else {
                    $scope.subTotal = 0;
                    $scope.carNumber = 0;
                    $scope.showCarItems = false;
                    $scope.showLoginMessage = true;
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
                    url: "/amazon/amazonmodifycart",
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
            }
        }]);
