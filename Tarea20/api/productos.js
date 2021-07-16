const Productos = require('../models/productos');

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