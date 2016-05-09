/**
 * Created by USRSIS0155 on 09/05/2016.
 */
angular
    .module('boxit')
    .controller('indexController', ['$scope', 'userData',
        function ($scope, userData) {
            $scope.init = function () {
                userData.setSearchIndex();
            };
        }]);
