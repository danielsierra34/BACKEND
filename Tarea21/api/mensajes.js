const Mensajes = require('../models/mongoLOCAL/mensajes');

class ControladorMensajes{

    constructor() { }

    async listar() {
        try {
            return await Mensajes.listar();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Mensajes.buscar(id);
        } catch (error) {
            throw error;
        }
    }
    async agregar(mensaje) {
        try {
            return await Mensajes.agregar(mensaje);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Mensajes.eliminar(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControladorMensajes();