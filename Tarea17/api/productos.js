const Productos = require('../models/productos');

class ControladorProductos{

    constructor() { }

    async listar() {
        try {
            return await Productos.listar();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Productos.buscar(id);
        } catch (error) {
            throw error;
        } 
    }
    async agregar(mensaje) {
        try {
            return await Productos.agregar(mensaje);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Productos.eliminar(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControladorProductos();