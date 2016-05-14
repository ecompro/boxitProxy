angular
        .module('boxit')
        .controller('shoppingCarController', ['$scope', '$http', '$q', '$anchorScroll', '$location', 'userData', '$uibModal', '$localStorage',
            function ($scope, $http, $q, $anchorScroll, $location, userData, $uibModal, $localStorage) {
                var products = [];
                var links = [];
                $scope.totalItems = 50;
                $scope.currentPage = 1;
                $scope.showPagination = false;
                $scope.showImage = true;
                $scope.showCar = false;
                $scope.UserName = userData.getData().UserName;
                $scope.indexs = userData.getSearchIndex();
                
                userData.getShoppingCar(userData.getData().IdCliente).then(function success(result) {
                    //   console.log(result.data.Data.Cart);
                    if (null !== result.data.Data.Cart.CartItems) {
                        console.log(result.data.Data.Cart.CartItems.CartItem);
                        if ($.isArray(result.data.Data.Cart.CartItems.CartItem)) {
                            console.log("es array");
                            $scope.carItems = result.data.Data.Cart.CartItems.CartItem;
                        }else{
                            console.log("no es array");
                          var Items = [];
                          Items.push(result.data.Data.Cart.CartItems.CartItem);
                          $scope.carItems = Items;
                        }
                        $scope.subTotal = result.data.Data.Cart.CartItems.SubTotal.FormattedPrice;
                        console.log($scope.carItems);
                        $scope.carNumber = $scope.carItems.length;
                    } else {
                        $scope.carNumber = 0;
                        $scope.subTotal = 0;
                    }
                }, function error(result) {
                    console.log(result);
                });
                $scope.doSearch = function () {
                    products = [];
                    searchProducts().then(function success(result) {
                        $scope.showImage = false;
                        $scope.showCar = true;
                        $scope.showPagination = true;
                        $scope.Items = products[0];
                        console.log(products);
                        console.log(products.length);
                    });
                };
                function searchProducts() {
                    var defered = $q.defer();
                    var promise = defered.promise;
                    var i = 1;
                    for (i = 1; i < 6; i++) {
                        var searchParams = {};
                        searchParams["Keywords"] = $scope.keyword;
                        searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
                        searchParams["ItemPage"] = i;
                        callPages(searchParams).then(function success(result) {
                            products.push(result);
                            if (i === 6) {
                                defered.resolve("success");
                            }
                        });
                    }
                    return promise;
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
                    $scope.index = $scope.indexs[30];
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

                            //defered.resolve('success');

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
                    var params = {}
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
            }])
        ;
