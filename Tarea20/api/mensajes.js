const Mensajes = require('../models/mensajes');

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
            return await Mensajes.findById(id);
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