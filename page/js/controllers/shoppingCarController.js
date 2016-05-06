angular
    .module('boxit')
    .controller('shoppingCarController', ['$scope', '$http',
        function ($scope, $http) {
            $http({
                method: "POST",
                url: "/amazon/amazongetsearchindex",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(result) {
                $scope.indexs = result.data;
            },function error(result) {
                console.log(result.data);
            });
            $scope.searchProducts = function () {
                var searchParams = {};
                searchParams["Keywords"] = $scope.keyword;
                searchParams["SearchIndex"] = $scope.index.attributes.SearchIndex;
                searchParams["ItemPage"] = "1";
                console.log(searchParams);
                $http({
                    method: "POST",
                    url: "/amazon/amazongetkeywords",
                    data: searchParams,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    $scope.Items = result.data.Item;
                },function error(result) {
                    console.log(result.data);
                });
            }
        }]);
