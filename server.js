/**
 * Created by leonardo on 23/04/16.
 */
var express = require('express'),
        app = express();
var soap = require('soap');
var bodyParser = require('body-parser');
var url = 'http://200.62.34.16/SF.GrupoAuraIntegracionPrueba/?wsdl';
var port = process.env.PORT || 8080;
var CustomerUser = "SGroup";
var CustomerPassword = "S1stem@#B0x1t";
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/page'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/page/index.html')
});
var usersRouter = express.Router();

usersRouter.route('/getplataformas')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;

            soap.createClient(url, function (err, client) {
                client.GetPlataformas(args, function (err, result) {
                    if (result.GetPlataformasResult.Data.Rows.length == undefined) {
                        res.json(result.GetPlataformasResult.Data.Rows.attributes.Message);
                    } else {
                        res.json(result.GetPlataformasResult.Data.Rows);
                    }

                });
            });
        });
usersRouter.route('/insertuserboxit')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["UserName"] = req.body.UserName;
            args["UserLastName"] = req.body.UserLastName;
            args["UserEmail"] = req.body.UserEmail;
            args["UserPassword"] = req.body.UserPassword;
            args["IdPlataforma"] = req.body.IdPlataforma;
            soap.createClient(url, function (err, client) {
                client.InsertUserBoxIt(args, function (err, result) {
//                    if (result.InsertUserBoxItResult.Data.Rows.length == undefined) {
//                        res.json(result.InsertUserBoxItResult.Data.Rows.attributes.Message);
//                    } else {
//                      
//                    }
                    res.json(result.InsertUserBoxItResult.Data.Rows);
                });
            });
        });

usersRouter.route('/loginuserboxit')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["UserEmail"] = req.body.UserEmail;
            args["UserPassword"] = req.body.UserPassword;
            soap.createClient(url, function (err, client) {
                client.LoginUserBoxIt(args, function (err, result) {
                    // if (result.LoginUserBoxItResult.Data.Rows.length == undefined) {
                    res.json(result.LoginUserBoxItResult.Data);
                    //} else {
                    //     res.json(result.LoginUserBoxItResult.Data.Rows);
                    // }

                });
            });
        });
usersRouter.route('/activeuserboxit').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;

            soap.createClient(url, function (err, client) {
                client.ActiveUserBoxIt(args, function (err, result) {
                    res.json(result.ActiveUserBoxItResult);

                });
            });
        });

//GetInfoUserBoxIt
usersRouter.route('/getinfouserboxit').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;

            soap.createClient(url, function (err, client) {
                client.GetInfoUserBoxIt(args, function (err, result) {
                    res.json(result.GetInfoUserBoxItResult);

                });
            });
        });

//UpdateInfoUserBoxIt
usersRouter.route('/updateinfouserboxit').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["UserName"] = req.body.UserName;
            args["UserLastName"] = req.body.UserLastName;
            args["UserGender"] = req.body.UserGender;
            args["UserBirthdate"] = req.body.UserBirthdate;
            args["IdPlataforma"] = req.body.IdPlataforma;
            args["UserEmail"] = req.body.UserEmail;
            args["IdPlataforma"] = req.body.UserPhone;

            soap.createClient(url, function (err, client) {
                client.UpdateInfoUserBoxIt(args, function (err, result) {
                    res.json(result.UpdateInfoUserBoxItResult);

                });
            });
        });

//UpdatePasswordUserBoxIt
usersRouter.route('/updatepassworduserboxit').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["UserPasswordOld"] = req.body.UserPasswordOld;
            args["UserPasswordNew"] = req.body.UserPasswordNew;


            soap.createClient(url, function (err, client) {
                client.UpdatePasswordUserBoxIt(args, function (err, result) {
                    res.json(result.UpdatePasswordUserBoxItResult);

                });
            });
        });
usersRouter.route('/getcategorias')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;

            soap.createClient(url, function (err, client) {
                client.GetPlataformas(args, function (err, result) {
                    if (result.GetCategorias.Data.Rows.length == undefined) {
                        res.json(result.GetCategoriasResult.Data.Rows.attributes.Message);
                    } else {
                        res.json(result.GetCategoriasResult.Data.Rows);
                    }

                });
            });
        });

usersRouter.route('/gettracking').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;

            soap.createClient(url, function (err, client) {
                client.GetTracking(args, function (err, result) {
                    res.json(result.GetTrackingResult);

                });
            });
        });

//InsertClientAlert

usersRouter.route('/insertclientalert').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["TrackingNumber"] = req.body.TrackingNumber;
            args["Shop"] = req.body.Shop;
            args["Value"] = req.body.Value;
            args["Description"] = req.body.Description;


            soap.createClient(url, function (err, client) {
                client.InsertClientAlert(args, function (err, result) {
                    res.json(result.InsertClientAlert);

                });
            });
        });

//GetTrackingById     
usersRouter.route('/gettrackingbyid').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["TrackingNumber"] = req.body.TrackingNumber;

            soap.createClient(url, function (err, client) {
                client.GetTrackingById(args, function (err, result) {
                    res.json(result.GetTrackingByIdResult);

                });
            });
        });
//GetPackagesHistorical
usersRouter.route('/getpackageshistorical').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["Cod_Paquete"] = req.body.Cod_Paquete;

            soap.createClient(url, function (err, client) {
                client.GetPackagesHistorical(args, function (err, result) {
                    res.json(result.GetPackagesHistoricalResult);

                });
            });
        });

//GetPurchaseOrder
usersRouter.route('/getpurchaseorder').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;


            soap.createClient(url, function (err, client) {
                client.GetPurchaseOrder(args, function (err, result) {
                    res.json(result.GetPurchaseOrderHistoricalResult);

                });
            });
        });
//InsertPurchaseOrder
usersRouter.route('/insertpurchaseorder').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["Package"] = req.body.Package;
            args["Link"] = req.body.Link;
            args["Quantity"] = req.body.Quantity;
            args["Amount"] = req.body.Amount;


            soap.createClient(url, function (err, client) {
                client.InsertPurchaseOrder(args, function (err, result) {
                    res.json(result.InsertPurchaseOrderResult);

                });
            });
        });

//SendForgetPassword
usersRouter.route('/sendforgetpassword').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["email"] = req.body.email;


            soap.createClient(url, function (err, client) {
                client.SendForgetPassword(args, function (err, result) {
                    res.json(result.SendForgetPasswordResult);

                });
            });
        });
//UpdateForgetPassword
usersRouter.route('/updateforgetpassword').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["UserPasswordNew"] = req.body.UserPasswordNew;

            soap.createClient(url, function (err, client) {
                client.UpdateForgetPassword(args, function (err, result) {
                    res.json(result.UpdateForgetPasswordResult);

                });
            });
        });
//GetAddressMiamiUser
usersRouter.route('/getaddressmiamiuser').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
          

            soap.createClient(url, function (err, client) {
                client.GetAddressMiamiUser(args, function (err, result) {
                    res.json(result.GetAddressMiamiUserResult);

                });
            });
        });
app.use('/users', usersRouter);
app.listen(port);
console.log('Magic happens on port ' + port);