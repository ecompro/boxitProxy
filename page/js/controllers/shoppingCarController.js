angular
    .module('boxit')
    .controller('shoppingCarController', ['$scope', '$http',
        function ($scope, $http) {
            var searchParams = {};
            searchParams["Keywords"] = "Asus I7";
            searchParams["SearchIndex"] = "Electronics";
            searchParams["ItemPage"] = "1";
            $http({
                method: "POST",
                url: "/amazon/amazongetkeywords",
                data: searchParams,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function success(result) {
                console.log(result.data.Item);
                $scope.Items = result.data.Item;
            },function error(result) {
                console.log(result.data);
            });
        }]);
