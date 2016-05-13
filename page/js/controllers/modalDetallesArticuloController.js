/**
 * Created by USRSIS0155 on 11/05/2016.
 */
angular
    .module('boxit')
    .controller('modalDetallesArticulosController', ['$scope', '$uibModalInstance', 'item', 'userData',
        function ($scope, $uibModalInstance, item, userData) {
            $scope.titulo = item.Item.Attributes.Title;
            $scope.texto = getDescription(item).trim();
            $scope.imgUrl = item.Item.Image.ImageUrl;
            $scope.itemPrice = item.Item.Offers.Offer.OfferListing.Price.FormattedPrice;
            $scope.total = numeral(0).format('$0,0.00');
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
            $scope.addToCar = function () {
                var args = {};
                args["IdCliente"] = userData.getData().IdCliente;
                args["ItemId"] = item.Item.ItemId;
                if ($scope.cantidad == 0 || $scope.cantidad === undefined) {
                    args["Quantity"] = "0";
                } else {
                    args["Quantity"] = $scope.cantidad;
                }
                console.log(args);
                userData.addItemToCar(args).then(function success(result) {
                    $uibModalInstance.close();
                }, function error(result) {
                    console.log(result);
                });
            };
            $scope.refreshTotal = function () {
                $scope.total = numeral((item.Item.Offers.Offer.OfferListing.Price.Amount * $scope.cantidad) / 100).format('$0,0.00');
            };
            $scope.closeModal = function () {
                $uibModalInstance.close();
            }
        }]);
