angular
    .module('boxit')
    .controller('modalCambioClaveController', ['$scope', '$uibModalInstance','mensaje',
        function ($scope, $uibModalInstance, mensaje) {
            console.log(mensaje);
            $scope.titulo = mensaje.titulo;
            $scope.texto = mensaje.texto;
            if(mensaje.estilo === "exito") {
                  $scope.estilo = "text-success";
            }else if(mensaje.estilo ===  "advertencia"){
                $scope.estilo = "text-warning";
            }else if(mensaje.estilo === "alerta"){
                $scope.estilo = "text-danger";
            }
            console.log()
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        }]);
