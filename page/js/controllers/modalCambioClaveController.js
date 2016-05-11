angular
    .module('boxit')
    .controller('modalCambioClaveController', ['$scope', '$uibModalInstance','mensaje',
        function ($scope, $uibModalInstance, mensaje) {
            console.log(mensaje);
            $scope.titulo = mensaje.titulo;
            $scope.texto = mensaje.texto;
            if(mensaje.tipo === "exito") {
                  $scope.estilo = "bg-success";
            }else if(mensaje.tipo ===  "advertencia"){
                $scope.estilo = "bg-warning";
            }else if(mensaje.tipo ===  "alerta"){
                $scope.estilo = "bg-danger";
            }
            
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        }]);
