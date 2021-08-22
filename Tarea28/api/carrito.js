const Carrito = require('../models/mongoLOCAL/carrito');
const Productos = require('../api/productos');
class ControladorCarrito{

    constructor() { }
    async listar() {
        try {
            return await Carrito.find();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Carrito.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async agregar(mensaje) {
        try {
            return await Carrito.create(mensaje);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Carrito.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    
}

module.exports = new ControladorCarrito();