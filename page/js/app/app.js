angular.module('boxit', ['ngToast', 'ui.bootstrap', 'ui.router', 'ngStorage', 'angular-md5'])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
                
                 $urlRouterProvider.otherwise('/home');
                  $stateProvider.state('itemList', {
                    url: '/itemList',
                    templateUrl: 'views/itemList.html',
                    controller: 'shoppingCarController'
                }).state('itemDetails', {
                    url: '/itemDetails',
                    templateUrl: 'views/detallesDelArticulo.html',
                    params: {
                        itemId: ""
                    },
                    controller: 'detallesDelArticuloController'
                }).state('checkoutmessage', {
                    url: '/checkoutmessage',
                    templateUrl: 'views/checkoutmessage.html'
                }).state('userMenu', {
                    url: '/userInterface',
                    templateUrl: 'views/userMenu.html',
                    controller: 'userMenuController'
                }).state('userMenu.inicio', {
                    url: '/inicio',
                    templateUrl: 'views/inicio.html',
                    controller: 'inicioController'
                }).state('userMenu.editarPerfil', {
                    url: '/editarPerfil',
                    templateUrl: 'views/editarPerfil.html',
                    controller: 'editarPerfilController'
                }).state('userMenu.modificarContrasena', {
                    url: '/modificarContrasena',
                    templateUrl: 'views/modificarContrasena.html',
                    controller: 'modificarContrasenaController'
                }).state('userMenu.seleccionarBoxIt', {
                    url: '/seleccionarBoxIt',
                    templateUrl: 'views/seleccionarBoxIt.html',
                    controller: 'seleccionarBoxitController'
                }).state('userMenu.anunciarPaquete', {
                    url: '/anunciarPaquete',
                    templateUrl: 'views/anunciarPaquete.html',
                    controller: 'anunciarPaqueteController'
                }).state('userMenu.trakingDePaquetes', {
                    url: '/trakingDePaquetes',
                    templateUrl: 'views/trakingDePaquetes.html',
                    controller: 'trakingDePaquetesController'
                }).state('userMenu.cerrarSesion', {
                    url: '/cerrarSesion',
                    templateUrl: 'views/cerrarSesion.html',
                    controller: 'cerrarSesionController'
                }).state('recovery', {
                    url: '/recovery/:hash',
                    templateUrl: "views/recuperarPassForm.html",
                    controller: 'passwordController'
                }).state('activar', {
                    url: '/activar/:hash',
                    templateUrl: "views/activar.html",
                    controller: 'activarController'
                }).state('home', {
                    url: "/home",
                    templateUrl: "views/home.html",
                    controller: "IndexController"
                }
                ).state('devolucion', {
                    url: "/devolucion",
                    templateUrl: "views/Devolucion.html",
                    controller: ""
                }
                ).state('enviar', {
                    url: "/enviar",
                    templateUrl: "views/Enviar.html",
                    controller: ""
                }
                ).state('FAQ', {
                    url: "/FAQ",
                    templateUrl: "views/FAQ.html",
                    controller: ""

                }
                ).state('iniciarSesion', {
                    url: "/iniciarSesion",
                    templateUrl: "views/IniciarSesion.html",
                    controller: "loginController"

                }
                ).state('nosotros', {
                    url: "/nosotros",
                    templateUrl: "views/Nosotros.html",
                    controller: ""
                }
                ).state('pagoservicio', {
                    url: "/pagoservicio",
                    templateUrl: "views/Pagoservicio.html",
                    controller: ""

                }
                ).state('precios', {
                    url: "/precios",
                    templateUrl: "views/Precios.html",
                    controller: ""
                }
                ).state('registro', {
                    url: "/registro",
                    templateUrl: "views/Registro.html",
                    controller: "siginController"
                }
                ).state('retiro', {
                    url: "/retiro",
                    templateUrl: "views/Retiro.html",
                    controller: ""
                }
                ).state('boxitStore', {
                    url: "/boxitStore",
                    templateUrl: "views/BoxitStore.html",
                    controller: "shoppingCarController"
                }
                );
            }]);