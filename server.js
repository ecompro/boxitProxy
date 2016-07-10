/**
 * Created by leonardo on 23/04/16.
 */
var express = require('express'),
        app = express();
var soap = require('soap');
var bodyParser = require('body-parser');
var url = 'http://200.62.34.16/SF.GrupoAuraIntegracion/?wsdl';
var port =  process.env.PORT || 8080;
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
console.log(url);
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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }
                client.GetPlataformas(args, function (err, result) {
                    if (result === undefined) {
                        res.json("Servidor no responde");
                        return;
                    } else if (result.GetPlataformasResult.Data.Rows.length === undefined) {
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
            args["UserGender"] = req.body.UserGender;
            args["UserBirthdate"] = req.body.UserBirthdate;
           
            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.InsertUserBoxIt(args, function (err, result) {
                    if (result === undefined) {
                        res.json("Servidor no responde");
                        return;
                    }
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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }
                client.LoginUserBoxIt(args, function (err, result) {
                    if (result === undefined) {
                        res.json("Servidor no responde");
                        return;
                    }


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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }

                client.ActiveUserBoxIt(args, function (err, result) {
                    
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.GetInfoUserBoxIt(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    res.json(result.GetInfoUserBoxItResult.Data);

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
            args["UserPhone"] = req.body.UserPhone;

            soap.createClient(url, function (err, client) {

                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }



                client.UpdateInfoUserBoxIt(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.UpdateInfoUserBoxItResult.Data.Rows);
                    //console.log(JSON.stringify(result.UpdateInfoUserBoxItResult.Data.Rows));
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

                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }



                client.UpdatePasswordUserBoxIt(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.UpdatePasswordUserBoxItResult.Data);

                });
            });
        });
usersRouter.route('/getcategorias')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;

            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.GetPlataformas(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    if (result.GetCategorias.Data.Rows.length == undefined) {
                        res.json(result.GetCategoriasResult.Data.Rows.attributes.Message);
                    } else {
                        res.json(result.GetCategoriasResult.Data.Rows);
                    }

                });
            });
        });


usersRouter.route('/gettarifas')
        .post(function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;

            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.GetTarifas(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                   
                    if (result.GetTarifasResult.Data.Rows.length === undefined) {
                        res.json(result.GetTarifasResult.Data.Rows.attributes.Message);
                    } else {
                        res.json(result.GetTarifasResult.Data.Rows);
                    }
                       // res.json(result);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.GetTracking(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.GetTrackingResult.Data);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.InsertClientAlert(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    res.json(result.InsertClientAlertResult);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }



                client.GetTrackingById(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.GetTrackingByIdResult.Data);

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

                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.GetPackagesHistorical(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    res.json(result.GetPackagesHistoricalResult.Data);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }

                client.GetPurchaseOrder(args, function (err, result) {
                    
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.GetPurchaseOrderHistoricalResult.Data);

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
            //descripcion del producto
            args["Package"] = req.body.Package;
            //link al producto en amazon
            args["Link"] = req.body.Link;
            //cantidad de unidades
            args["Quantity"] = req.body.Quantity;
            //precio de la unidad
            args["Amount"] = req.body.Amount;


            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.InsertPurchaseOrder(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    res.json(result.InsertPurchaseOrderResult.Data);

                });
            });
        });

//SendForgetPassword
usersRouter.route('/sendforgetpassword').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["Email"] = req.body.Email;


            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor n.Rowso responde");
                    return;
                }



                client.SendForgetPassword(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    
                    res.json(result.SendForgetPasswordResult.Data);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.UpdateForgetPassword(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.UpdateForgetPasswordResult.Data);

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
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }



                client.GetAddressMiamiUser(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.GetAddressMiamiUserResult.Data);

                });
            });
        });

// aca servicios de amazon
var amazonRouter = express.Router();
// keywords son las palabras clavez puede estar vacia
//searchIndex son las categorias se obtiene por AmazonGetSearchIndex
//item page creo que son el numero de paginas de resultados
amazonRouter.route('/amazongetkeywords').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["Keywords"] = req.body.Keywords;//I7
            args["SearchIndex"] = req.body.SearchIndex;//Electronics
            args["ItemPage"] = req.body.ItemPage;//1



            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }

                client.AmazonGetKeywords(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.AmazonGetKeywordsResult.Data.Items);
                });
            });
        });

//devuelve el item de amazon
amazonRouter.route('/amazongetitemid').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["ItemId"] = req.body.ItemId;




            soap.createClient(url, function (err, client) {
                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.AmazonGetItemId(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.AmazonGetItemIdResult.Data);

                });
            });
        });

//devuelve las categorias
amazonRouter.route('/amazongetsearchindex').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            soap.createClient(url, function (err, client) {

                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }


                client.AmazonGetSearchIndex(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.AmazonGetSearchIndexResult.Data.Rows);

                });
            });
        });
//AmazonAddCart agrega al carrito de compras
amazonRouter.route('/amazonaddcart').post(
        function (req, res) {
            var args = {};
            args["CustomerUser"] = CustomerUser;
            args["CustomerPassword"] = CustomerPassword;
            args["IdCliente"] = req.body.IdCliente;
            args["ItemId"] = req.body.ItemId;
            args["OfferListingId"] = req.body.OfferListingId;
            args["Quantity"] = req.body.Quantity;

            soap.createClient(url, function (err, client) {

                if (client === undefined) {
                    res.json("Servidor no responde");
                    return;
                }



                client.AmazonAddCart(args, function (err, result) {
                       if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
                    
                    res.json(result.AmazonAddCartResult);

                });
            });
        });
// obtiene el contenido del carrito de compras        
amazonRouter.route('/amazongetcart').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["IdCliente"] = req.body.IdCliente;

    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }


        client.AmazonGetCart(args, function (err, result) {
               if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
            
            res.json(result.AmazonGetCartResult);

        });
    });
});

amazonRouter.route('/amazonclearcart').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["IdCliente"] = req.body.IdCliente;

    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }


        client.AmazonClearCart(args, function (err, result) {
               if(result === undefined){
                    res.json("Servidor no responde");
                    return ;
                }
            
            res.json(result.AmazonClearCartResult);

        });
    });
});

amazonRouter.route('/amazonmodifycart').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["IdCliente"] = req.body.IdCliente;
    args["CartItemId"] = req.body.CartItemId;
    args["Quantity"] = req.body.Quantity;

    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AmazonModifyCart(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            res.json(result.AmazonModifyCartResult);
        });
    });
});

//AmazonGetKeywordsInit
amazonRouter.route('/amazongetkeywordsinit').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["SearchIndex"] = req.body.SearchIndex;
    args["ItemPage"] = req.body.ItemPage;
    args["IdCliente"] = req.body.Quantity;

    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AmazonGetKeywordsInit(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            res.json(result.AmazonGetKeywordsInitResult.Data.Items);
            
        });
    });
});

amazonRouter.route('/amazongetkeywordsrandom').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
   

    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AmazonGetKeywordsRandom(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            res.json(result.AmazonGetKeywordsRandomResult.Data.Items);
        });
    });
});

//AmazonGetKeywordsRandom

amazonRouter.route('/amazongetitemidvariations').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["ItemId"] = req.body.ItemId;
    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AmazonGetItemIdVariations(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            res.json(result.AmazonGetItemIdVariationsResult.Data.Items); //.Data.Items);
        });
    });
});

amazonRouter.route('/amazongetcategories').post(function (req, res) {
    var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["SearchIndex"] = req.body.SearchIndex;
    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AmazonGetCategories(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            res.json(result.AmazonGetCategoriesResult.Data.Nodes.Categories.SubCategories.SubCategory); //.Data.Items);
        });
    });
});

amazonRouter.route('/amazonannulpurchaseorder').post(function (req, res){
     var args = {};
    args["CustomerUser"] = CustomerUser;
    args["CustomerPassword"] = CustomerPassword;
    args["IdCompraCliente"] = req.body.IdCompraCliente;
    soap.createClient(url, function (err, client) {
        if (client === undefined) {
            res.json("Servidor no responde");
            return;
        }
        client.AnnulPurchaseOrder(args, function (err, result) {
            if (result === undefined) {
                res.json("Servidor no responde");
                return;
            }
            console.log(result)
            res.json(result.AnnulPurchaseOrderResult); //.Data.Items);
        });
    });
    
    
    
});
app.use('/users', usersRouter);
app.use('/amazon', amazonRouter);
app.listen(port);
console.log('Magic happens on port ' + port);