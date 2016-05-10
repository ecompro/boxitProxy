angular
    .module('boxit')
    .controller('modalCambioClaveController', ['$scope', '$uibModalInstance',
        function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();
            }
        }]);
