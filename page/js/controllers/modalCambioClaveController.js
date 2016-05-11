angular
    .module('boxit')
    .controller('modalCambioClaveController', ['$scope', '$uibModalInstance','mensaje',
        function ($scope, $uibModalInstance, mensaje) {
            console.log(mensaje);
            $scope.mensaje = mensaje;
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        }]);
