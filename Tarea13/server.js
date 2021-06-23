const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const http = require('http').Server(app)

const Productos = require('./api/productos')
const instanciaProductos = new Productos("productos.txt");

const Mensajes = require('./api/mensajes');
const instanciaMensajes = new Mensajes("mensajes.txt");

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
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos',instanciaProductos.read());
    socket.emit('mensajes',instanciaMensajes.read());

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        //io.sockets.emit('productos', productos.listar());
        io.sockets.emit('productos',instanciaProductos.read());
        console.log("se creo un nuevo producto")
    });

    socket.on('mensajes', data => {
        console.log("llego un mensaje")
        io.sockets.emit('mensajes',instanciaMensajes.read());
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

