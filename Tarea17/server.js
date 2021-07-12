const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const http = require('http').Server(app)


const instanciaProductos = require('./api/productos')

const instanciaMensajes = require('./api/mensajes');

const instanciaCarrito = require('./api/carrito');

const io = require('socket.io')(http)

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
 
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!'); 

    let carrito = await instanciaCarrito.listar()
    socket.emit('carrito',carrito);

    let mensajes = await instanciaMensajes.listar()
    socket.emit('mensajes',mensajes);

    //Escucho los mensajes enviado por el cliente y se los propago a todos
    socket.on('update', data => {
        //io.sockets.emit('productos', productos.listar());
        /*io.sockets.emit('productos',instanciaProductos.read());
        console.log("se creo un nuevo producto")*/
    });

    socket.on('mensajes', async data => {
        console.log("llego un mensaje")
        let mensajes= await instanciaMensajes.listar()
        io.sockets.emit('mensajes',mensajes);
    });

    socket.on('productoCreado', async data => {
        console.log("Se creo un producto")
        let productos= await instanciaProductos.listar()
        io.sockets.emit('productos',productos);
    });

    socket.on('agregado', async data => {
        console.log("se agrego un producto")
        socket.emit('carrito',await instanciaCarrito.listar());
        /*io.sockets.emit('mensajes',instanciaMensajes.read());*/
    });
    socket.on('eliminado', async data => {
        console.log("se elimino un producto del carrito")
        socket.emit('carrito',await instanciaCarrito.listar());
        /*io.sockets.emit('mensajes',instanciaMensajes.read());*/
    });

});


// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

// importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

const mensajesRouter = require('./routes/mensajes');
app.use('/api/mensajes', mensajesRouter);

const carritoRouter = require('./routes/carrito');
app.use('/api/carrito', carritoRouter);
 
// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`); 
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

