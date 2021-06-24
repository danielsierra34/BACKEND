var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var http = require('http').Server(app);
var Productos = require('./api/productos');
var instanciaProductos = new Productos("productos.txt");
var Mensajes = require('./api/mensajes');
var instanciaMensajes = new Mensajes("mensajes.txt");
var io = require('socket.io')(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Nuevo cliente conectado!');
        /* Envio los mensajes al cliente que se conectó */
        socket.emit('productos', instanciaProductos.read());
        socket.emit('mensajes', instanciaMensajes.read());
        /* Escucho los mensajes enviado por el cliente y se los propago a todos */
        socket.on('update', function (data) {
            //io.sockets.emit('productos', productos.listar());
            io.sockets.emit('productos', instanciaProductos.read());
            console.log("se creo un nuevo producto");
        });
        socket.on('mensajes', function (data) {
            console.log("llego un mensaje");
            io.sockets.emit('mensajes', instanciaMensajes.read());
        });
        return [2 /*return*/];
    });
}); });
// protejo el servidor ante cualquier excepcion no atrapada
app.use(function (err, req, res, next) {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});
// importo las rutas y las uso con el prefijo /api
var productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);
var mensajesRouter = require('./routes/mensajes');
app.use('/api/mensajes', mensajesRouter);
// obtengo el puerto del enviroment o lo seteo por defecto
var PORT = process.env.PORT || 8080;
// pongo a escuchar el servidor en el puerto indicado
var server = http.listen(PORT, function () {
    console.log("servidor escuchando en http://localhost:" + PORT);
});
// en caso de error, avisar
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
