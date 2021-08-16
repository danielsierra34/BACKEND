const express = require('express');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars')
const config = require('./config/config.json');

//const bodyParser = require('body-parser');

let storageFactory = require('./storage.factory');
let storageConfig = storageFactory.getStorage(config.STORAGE);

global.persistencia="filesystem" //listo
//global.persistencia="firebase"
//global.persistencia="mongoDBAAS"
//global.persistencia="mongoLOCAL" //listo
//global.persistencia="mysqlDBAAS"
//global.persistencia="mysqlLOCAL" //listo
//global.persistencia="sqlite3" //listo
console.log(global.persistencia)

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('hbs',handlebars({ 
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + '/views/partials/'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use(storageConfig.getSession());

const instanciaProductos = require('./api/productos');
const instanciaMensajes = require('./api/mensajes');
//const instanciaCarrito = require('./api/carrito');

app.get('/', (req, res) => {
    res.send('Servidor express ok!');
});

let contador = 0;

app.get('/sin-session', (req, res) => {
    res.send({ contador: ++contador })
});

app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
    } else {
        req.session.contador = 1;
        res.send('Bienvenido!');
    }
});

app.all('/status', (request, response) => {
    if(!(request.cookies.username)){
        request.session.destroy(err => {
            if (!err) response.json({status:false})
            else response.json({status:false,body:err})
        })  
    }else{
        response.json({status:true, username:request.session.username})
    }
})


app.all('/logout', (request, response) => {
    request.session.destroy(err => {
        if (!err) response.clearCookie('username').send({status:true})
        else response.json({status:false,body:err})
    })  
    
})

app.all('/login', (request, response) => {    
    if(!(request.query.username)){
        response.json({status:false})
    }else{
        request.session.username=request.query.username
        console.log(request.session)
        response.cookie('username', request.query.username,{
             maxAge: 50000
            }).json({
                status:true, 
                username:request.query.username
            }
        )
    }
})


app.get('/info', (req, res) => {
    console.log('session', req.session)
    console.log('sessionID', req.sessionID)
    console.log('cookies', req.cookies)
    console.log('sessionStore', req.sessionStore)

    res.send('Send info ok!');
})

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

const PORT = process.env.PORT || 8080;
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`); 
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});