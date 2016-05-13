angular
    .module('boxit')
    .controller('shoppingCarController', ['$scope', '$http', '$q', '$anchorScroll', '$location', 'userData', '$uibModal',
        function ($scope, $http, $q, $anchorScroll, $location, userData, $uibModal) {
            var products = [];
            $scope.totalItems = 50;
            $scope.currentPage = 1;
            $scope.showPagination = false;
            $scope.showImage = true;
            $scope.showCar = false;
            $scope.UserName = userData.getData().UserName;
            $scope.indexs = userData.getSearchIndex();
            userData.getShoppingCar(userData.getData().IdCliente).then(function success(result) {
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
                $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modalShoppingCar.html',
                    size: 'lg',
                    controller: 'shoppingCarController'
                });
            }
        }])
;
