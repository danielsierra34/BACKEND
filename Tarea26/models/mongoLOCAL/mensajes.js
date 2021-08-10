const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/ecommerce"

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', url);
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

const schema = mongoose.Schema({
    email: { type: String, require: true, max: 100 },
    mensaje: { type: String, require: true, max:1000 },
}, {strict: true});

const Mensajes = mongoose.model('mensajes', schema);

class ControladorMensajes{

    constructor() { }

    async listar() {
        try {
            return await Mensajes.find();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Mensajes.find({id:parseInt(id)});
        } catch (error) {
            throw error;
        } 
    }
    async agregar(mensaje) {
        try {
            return await Mensajes.create(mensaje);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Mensajes.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControladorMensajes();






