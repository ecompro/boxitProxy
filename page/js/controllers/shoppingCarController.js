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
                console.log(result.data.Data.Cart);
                $scope.carItems = result.data.Data.Cart.CartItems.CartItem;
                $scope.subTotal = result.data.Data.Cart.CartItems.SubTotal.FormattedPrice;
                console.log($scope.carItems);
                $scope.carNumber = $scope.carItems.length;
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
                var defered = $q.defer();
                var promise = defered.promise;
                var i;
                for (i = 0; i < $scope.carItems.length; i++) {
                    var items = $scope.carItems[i];
                    getItemLink(items.ItemId).then(function success(result) {
                      links.push(result);
                        if (i === $scope.carItems.length) {
                            defered.resolve('success');
                        }
                    },function error(result) {
                        console.log(result);
                    });
                }
                return promise;
            };
            $scope.purchase = function () {
                links = [];
                itemLinks().then(function success(result) {
                  console.log(links);
                    for (var i = 0; i < $scope.carItems.length; i++) {
                        var item = $scope.carItems[i];
                        var args = {};
                        args["IdCliente"] = userData.getData().IdCliente;
                        //descripcion del producto
                        args["Package"] = item.Title;
                        //link al producto en amazon
                        args["Link"] = links[i];
                        //cantidad de unidades
                        args["Quantity"] = item.Quantity;
                        //precio de la unidad
                        args["Amount"] = item.Price.Amount;
                        console.log(args);
                    }
                });
            }
        }])
;
