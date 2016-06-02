/**
 * Created by USRSIS0155 on 11/05/2016.
 */
angular
    .module('boxit')
    .controller('modalDetallesArticulosController', ['$scope', '$uibModalInstance', 'item', 'userData','$q','$http',
        function ($scope, $uibModalInstance, item, userData,$q,$http) {
            console.log(item);
            $scope.showZise = false;
            $scope.ShowColor = false;
            $scope.showCombination = false;
            $scope.disabledAdd = false;
            var usrObj = userData.getData();
            setItemData(item);
            setItemVariation(item);
            function setItemData(item) {
                $scope.userLogged = !(usrObj == undefined);
                $scope.titulo = item.Item.Attributes.Title;
                $scope.texto = getDescription(item).trim();
                $scope.imgUrl = item.Item.Image.ImageUrl;
                $scope.itemPrice = item.Item.Offers.Offer == null ? 0 : item.Item.Offers.Offer.OfferListing.Price.FormattedPrice;
                $scope.cantidad = 1;
                var amount = item.Item.Offers.Offer == null ? 0 : item.Item.Offers.Offer.OfferListing.Price.Amount;
                console.log($scope.itemPrice);
                console.log(amount);
                $scope.disabledAdd = $scope.itemPrice == 0 && amount == 0 ? true : false;
                console.log($scope.disabledAdd);
                console.log($scope.userLogged);
                console.log($scope.userLogged && $scope.disabledAdd);
                $scope.total = numeral(( amount * $scope.cantidad) / 100).format('$0,0.00');
            }

            function getItemVariation(item) {
                var defered = $q.defer();
                var promise = defered.promise;
                $http({
                    method: "POST",
                    url: userData.getHost() + "/amazon/amazongetitemidvariations",
                    data: {
                        "ItemId": item.Item.ItemId
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function success(result) {
                    defered.resolve(result.data.Item.Variations);
                },function error(result) {
                  defered.reject(result);
                });
                return promise;
            }

            function setItemVariation(item) {
                getItemVariation(item).then(function success(result) {
                    if (result == null) {
                        var colorExist = false;
                        var sizeExist = false;
                        console.log(item);
                        if (item.Item.Attributes.Size != null) {
                            $scope.showZise = true;
                            $scope.size = item.Item.Attributes.Size;
                            sizeExist = true;
                        }
                        if (item.Item.Attributes.Color != null) {
                            $scope.ShowColor = true;
                            $scope.color = item.Item.Attributes.Color;
                            colorExist = true;
                        }
                        if (sizeExist && colorExist) {
                            $scope.showCombination = true;
                        }
                    }
                },function error(result) {
                    console.log(result);
                });
            }

            function getDescription(item) {
                var description = "";
                if (item.Item.Attributes.Feature != undefined) {
                    if (item.Item.Attributes.Feature.length != null && typeof item.Item.Attributes.Feature === "string") {
                        description = item.Item.Attributes.Feature;
                    } else {
                        if (item.Item.Attributes.Feature.length != null) {
                            for (var i = 0; i < item.Item.Attributes.Feature.length; i++) {
                                description = description.concat(" ", item.Item.Attributes.Feature[i]);
                            }
                        }
                    }
                } else {
                    description = "Descripcion no Disponible"
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
