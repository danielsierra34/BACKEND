const express = require('express');//ya
const bodyParser = require('body-parser');//ya
const handlebars = require('express-handlebars');//ya
//const cookieParser = require('cookie-parser');
// ------------------------------------------------------------------------------
//  PASSPORT
// ------------------------------------------------------------------------------
const passport = require('passport');//ya
const bCrypt = require('bCrypt');//ya
const LocalStrategy = require('passport-local').Strategy;//ya
const config = require('./config/config.json');
const controllersdb = require('./controllersdb');//ya
const User = require('./models');//ya


global.persistencia="filesystem" //listo
//global.persistencia="firebase"
//global.persistencia="mongoDBAAS"
//global.persistencia="mongoLOCAL" //listo
//global.persistencia="mysqlDBAAS"
//global.persistencia="mysqlLOCAL" //listo
//global.persistencia="sqlite3" //listo
console.log(global.persistencia)

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`email` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
// passport/login.js

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
function (req, email, password, done) {
    // check in mongo if a user with email exists or not
    User.findOne({ 'email': email },
    function (err, user) {
        // In case of any error, return using the done method
        if (err)
        return done(err);
        // email does not exist, log error & redirect back
        if (!user) {
            console.log('User Not Found with email ' + email);
            return done(null, false,
                //req.flash('message', 'User Not found.'));                 
                console.log('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false,
                    //req.flash('message', 'Invalid Password'));
                    console.log('message', 'Invalid Password'));
                }
                // User and password both match, return user from 
                // done method which will be treated like success
                return done(null, user);
            }
            );
        })
        );
        
        var isValidPassword = function (user, password) {
            return bCrypt.compareSync(password, user.password);
        }
        
        
        
        passport.use('register', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, email, password, done) {
            findOrCreateUser = function () {
                // find a user in Mongo with provided email
                User.findOne({ 'email': email }, function (err, user) {
                    // In case of any error return
                    if (err) {
                        console.log('Error in Register: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists');
                        return done(null, false,
                            //req.flash('message','User Already Exists'));
                            console.log('message', 'User Already Exists'));
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.email = req.body.username;
                            newUser.password = createHash(password);
                            newUser.firstName = req.body.firstName;
                            newUser.lastName = req.body.lastName;
                            
                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                }
                // Delay the execution of findOrCreateUser and execute 
                // the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
            )
            // Generates hash using bCrypt
            var createHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
            }
            
            
            // Configure Passport authenticated session persistence.
            //
            // In order to restore authentication state across HTTP requests, Passport needs
            // to serialize users into and deserialize users out of the session.  The
            // typical implementation of this is as simple as supplying the user ID when
            // serializing, and querying the user record by ID from the database when
            // deserializing.
            passport.serializeUser(function (user, done) {
                done(null, user._id);
            });
            
            passport.deserializeUser(function (id, done) {
                User.findById(id, function (err, user) {
                    done(err, user);
                });
            });
            
            
            // ------------------------------------------------------------------------------
            //  EXPRESS
            // ------------------------------------------------------------------------------
            
            const app = express();//ya
            const http = require('http').Server(app)
            const io = require('socket.io')(http)
            
            app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main.hbs' }));
            app.set('view engine', '.hbs');
            
            
            var port = process.env.PORT || 8080,
            ip = process.env.IP || '0.0.0.0';
            
            app.use(express.static(__dirname + '/public'));
            app.use(require('cookie-parser')());//ya
            app.use(bodyParser.urlencoded({ extended: true }));
            
            app.use(require('express-session')({
                secret: 'keyboard cat',
                cookie: {
                    httpOnly: false,
                    secure: false,
                    maxAge: config.TIEMPO_EXPIRACION
                },
                rolling: true,
                resave: true,
                saveUninitialized: false
            }));
            
            const instanciaProductos = require('./api/productos');
            const instanciaMensajes = require('./api/mensajes');
            //const instanciaCarrito = require('./api/carrito');
            
            // importo las rutas y las uso con el prefijo /api
            const productosRouter = require('./routes/productos');
            app.use('/api/productos', productosRouter);
            const mensajesRouter = require('./routes/mensajes');
            app.use('/api/mensajes', mensajesRouter);
            //const carritoRouter = require('./routes/carrito');
            //app.use('/api/carrito', carritoRouter);
            
            io.on('connection', async socket => {
                console.log('Nuevo cliente conectado!'); 
                //let carrito = await instanciaCarrito.listar()
                //socket.emit('carrito',carrito);
                
                let mensajes = await instanciaMensajes.listar()
                socket.emit('mensajes',mensajes);
                
                let productos = await instanciaProductos.listar()
                socket.emit('productos',productos);
                
                socket.on('mensajeCreado', async data => {
                    console.log("llego un mensaje")
                    let mensajes= await instanciaMensajes.listar()
                    io.sockets.emit('mensajes',mensajes);
                });
                
                socket.on('productoCreado', async data => {
                    console.log("Se creo un producto")
                    let productos= await instanciaProductos.listar()
                    io.sockets.emit('productos',productos);
                });
                socket.on('productoActualizado', async data => {
                    console.log("Se creo un producto")
                    let productos= await instanciaProductos.listar()
                    io.sockets.emit('productos',productos);
                });
                
                socket.on('carritoAgregado', async data => {
                    console.log("se agrego un producto")
                    socket.emit('carrito',await instanciaCarrito.listar());
                    //io.sockets.emit('mensajes',instanciaMensajes.read());
                });
                
                socket.on('carritoEliminado', async data => {
                    console.log("se elimino un producto del carrito")
                    socket.emit('carrito',await instanciaCarrito.listar());
                    //io.sockets.emit('mensajes',instanciaMensajes.read());
                });
                
            })
            
            // Initialize Passport and restore authentication state, if any, from the
            // session.
            app.use(passport.initialize());
            app.use(passport.session());
            
            app.use(function (req, res, next) {
                /*
                console.log('-- session --');
                console.log(req.session);
                console.log('-- headers --');
                console.log(req.headers.cookie);
                console.log('-------------');
                console.log('-- cookies --');
                console.log(req.cookies);
                console.log('-------------');
                console.log('-- signed cookies --');
                console.log(req.signedCookies);
                console.log('-------------');
                */
                next()
            });
            
            //  LOGIN
            app.post('/status', (req, res) => {
                if (req.isAuthenticated()) {  
                    console.log('user logueado');
                    res.json({
                        status: true,
                        user: req.user
                    });
                }
                else {
                    console.log('user NO logueado');
                    res.json({
                        status: false,
                        user: req.user
                    });
                }
            });
            
            app.post('/login',
            passport.authenticate('login', { failWithError: true }),
            function(req, res, next) {    
                console.log("bien",req.body)
                console.log(req.user);
                return res.json({status:true,mensaje:"Credenciales válidas",alert:"success"});
            },
            function(err, req, res, next) {//por aca sale si el usuario no es valido
                console.log("mal",req.body)
                if (req.xhr) { 
                    return res.json({err:err});
                }
                return res.json({status:false, mensaje:"El usuario no es valido",alert:"danger"});
            }
            );
            
            
            //  REGISTER
            app.post('/register',
            passport.authenticate('register', { failWithError: true }),
            function(req, res, next) {    
                console.log("bien",req.body)
                console.log(req.user);
                return res.json({status:true,mensaje:"Se registro el usuario con éxito",alert:"success"});
            },
            function(err, req, res, next) {//por aca sale si el usuario no es valido
                console.log(err)
                console.log("mal",req.body)
                if (req.xhr) { 
                    return res.json({err:err});
                }
                return res.json({status:false, mensaje:"El usuario ya existe",alert:"danger"});
            }
            );
            
            
            function checkAuthentication(req, res, next) {
                console.log("checkAuthentication")
                if (req.isAuthenticated()) {
                    //req.isAuthenticated() will return true if user is logged in
                    next();
                } else {
                    res.redirect("/login");
                }
            }
            
            app.get('/ruta-protegida', checkAuthentication, (req, res) => {
                //do something only if user is authenticated
                var user = req.user;
                console.log(user);
                res.send('<h1>Ruta OK!</h1>');
            });
            
            
            //  LOGOUT
            app.post('/logout', (req, res) => {
                console.log("login OUT")
                req.logout();
                res.json({
                    status: false,
                    user: req.user
                });
            });
            
            
            
            // ------------------------------------------------------------------------------
            //  LISTEN SERVER
            // ------------------------------------------------------------------------------
            controllersdb.conectarDB(config.URL_BASE_DE_DATOS, err => {
                
                if (err) return console.log('error en conexión de base de datos', err);
                console.log('BASE DE DATOS CONECTADA');
                
                http.listen(port, function (err) {
                    if (err) return console.log('error en listen server', err);
                    console.log(`Server running on port ${port}`);
                });
            });
            
