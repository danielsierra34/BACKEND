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
    title: { type: String, require: true, max: 100 },
    price: { type: Number, require: true},
    thumbnail: { type: String, require: true, max:1000 },
    id: { type: Number, require: true },
    stock: { type: Number, require: true},
    description: { type: String, require: true }
}, {strict: true});

const Productos = mongoose.model('productos', schema);




class ControladorProductos{

    constructor() { }

    async listar() {
        try {
            return await Productos.find();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Productos.findById(id);
        } catch (error) {
            throw error;
        } 
    }
    async agregar(mensaje) {
        try {
            return await Productos.create(mensaje);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Productos.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControladorProductos();






