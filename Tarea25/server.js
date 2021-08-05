const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const http = require('http').Server(app)
const cookieParser = require('cookie-parser')
const session = require('express-session')

global.persistencia="filesystem" //listo
//global.persistencia="firebase"
//global.persistencia="mongoDBAAS"
//global.persistencia="mongoLOCAL" //listo
//global.persistencia="mysqlDBAAS"
//global.persistencia="mysqlLOCAL" //listo
//global.persistencia="sqlite3" //listo

const instanciaProductos = require('./api/productos');

const instanciaMensajes = require('./api/mensajes');

//const instanciaCarrito = require('./api/carrito');

console.log(global.persistencia)

const io = require('socket.io')(http)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(session({
    secret:"xxxxx",
    resave:true,
    saveUninitialized:true

}))

app.engine('hbs',handlebars({ 
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + '/views/partials/'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')    

app.get('/', (request, response) => {
    console.log(request.query.username)
})

//COOKIES
app.get('/set', (request, response) => {
    response.cookie('server', 'express').send('Cookie Set')
})

app.get('/setEX', (request, response) => {
    response.cookie('server2', 'express2', { maxAge: 30000 }).send('Cookie SetEX')
})

/*app.get('/set-cookie/:name', (request, response) => {
    response.cookie('server', request.params.name).send('Cookie Set')
})*/

app.get('/set-cookie', (request, response) => {
    //response.cookie(request.query.name, request.query.content, { maxAge: parseInt(request.query.duration) }).send('Cookie Set')
    const {name,content,duration} = request.query
    nombre && valor ?
    response.cookie(name, content, (duration)?{maxAge: parseInt(request.query.duration)}:null).send('Cookie Set')
    :
    response.send({error: "falta nombre y valor"})
})

app.get('/clr', (request, response) => {
    response.clearCookie('server2').send('Cookie Clear')
})

app.get('/get', (request, response) => {
    response.send(request.cookies)
    console.log(request.cookies)
})

//Sessions

app.get('/sin-session', (request, response) => {
    let contador=0 
    response.send({contador:++contador})
    
})

app.get('/con-session', (request, response) => {
    if(request.session.contador){
        request.session.contador++
        response.send(`Ustad ha visitado el sitio ${request.session.contador} veces`)
    }else{
        request.session.contador=1
        response.send('Bienvenido a su primera visita')
    }
})

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
        response.cookie('username', request.query.username,{
             maxAge: 10000
            }).json({
                status:true, 
                username:request.query.username
            }
        )
    }
})

const auth = (request,response,next) => {
    if(request.session && request.session.username == "admin" && request.session.admin){
        return next();
    }else{
        return response.status(401).send("no autorizado")
    }
}

app.get('/contenido',auth,(request,response) => {
    response.send("solo el admin puede ver esta info")
})

app.get('/info', (req, res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')

    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
    console.log('--------------------------------------')

    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
    console.log('--------------------------------------')

    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
    console.log('--------------------------------------')

    res.send('Send info ok!')
})




 
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
        /*io.sockets.emit('mensajes',instanciaMensajes.read());*/
    });

    socket.on('carritoEliminado', async data => {
        console.log("se elimino un producto del carrito")
        socket.emit('carrito',await instanciaCarrito.listar());
        /*io.sockets.emit('mensajes',instanciaMensajes.read());*/
    });

}); 


// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, request, response, next) => {
    console.error(err.message);
    return response.status(500).send('Algo se rompio!');
});

// importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

const mensajesRouter = require('./routes/mensajes');
app.use('/api/mensajes', mensajesRouter);

//const carritoRouter = require('./routes/carrito');
//app.use('/api/carrito', carritoRouter);
 
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

