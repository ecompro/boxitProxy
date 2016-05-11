angular
    .module('boxit')
    .controller('modalCambioClaveController', ['$scope', '$uibModalInstance','mensaje',
        function ($scope, $uibModalInstance, mensaje) {
            console.log(mensaje);
            $scope.titulo = mensaje.titulo;
            $scope.texto = mensaje.texto;
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        }]);
