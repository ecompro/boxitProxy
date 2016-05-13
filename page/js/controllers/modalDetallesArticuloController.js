/**
 * Created by USRSIS0155 on 11/05/2016.
 */
angular
    .module('boxit')
    .controller('modalDetallesArticulosController', ['$scope', '$uibModalInstance', 'item',
        function ($scope, $uibModalInstance, item) {
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
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        }]);
