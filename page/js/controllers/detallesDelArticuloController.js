angular
    .module('boxit')
    .controller('detallesDelArticuloController', ['$scope', '$stateParams','userData',
        function ($scope, $stateParams,userData) {
            console.log($stateParams.itemId);
            userData.getItemDetails($stateParams.itemId).then(function success(item) {
                console.log(item);
                $scope.titulo = item.Item.Attributes.Title;
                $scope.texto = getDescription(item).trim();
                $scope.imgUrl = item.Item.Image.ImageUrl;
                $scope.itemPrice = item.Item.Offers.Offer.OfferListing.Price.FormattedPrice;
                function getDescription(item) {
                    var description = "";
                    if (item.Item.Attributes.Feature.length != null && typeof item.Item.Attributes.Feature === "string") {
                        description = item.Item.Attributes.Feature;
                    } else {
                        if (item.Item.Attributes.Feature.length != null) {
                            for (var i = 0; i < item.Item.Attributes.Feature.length; i++) {
                                description = description.concat(" ", item.Item.Attributes.Feature[i]);
                            }
                        }
                    }
                    return description;
                }
            }, function error(result) {
                console.log(result);
            });
        }]);
