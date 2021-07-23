const knex = require('../database/knex');

class Carrito {

    constructor() { }

    async listar() {
        try {
            let items = await knex('carrito').select('*')
            return items;
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            let items = await knex('carrito').where('id', '=', id)
            return items;
        } catch (error) {
            throw error;
        }
    }
    async agregar(item) {
        try {
            item.dateTime="www"
            let resultado = await knex('carrito').insert(item);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            let items = await knex('carrito').where('id', '=', id).del()
            return items;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new Carrito();