const knex = require('../../database/mysqlDBAAS/knex');

class ControladorMensajes {

    constructor() { }

    async listar() {
        try {
            let mensajes = await knex('mensajes').select('*')
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            let mensajes = await knex('mensajes').where('id', '=', id)
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
    async agregar(mensaje) {
        try {
            mensaje.dateTime=new Date().toLocaleString();
            let resultado = await knex('mensajes').insert(mensaje);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            let mensajes = await knex('mensajes').where('id', '=', id).del()
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new ControladorMensajes();