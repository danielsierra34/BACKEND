const knex = require('../../database/mysqlLOCAL/knex');

class Productos {

    constructor() { }

    async listar() {
        try {
            let productos = await knex('productos').select('*')
            return productos;
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            let productos = await knex('productos').where('id', '=', id)
            return productos;
        } catch (error) {
            throw error;
        }
    }
    async agregar(producto) {
        try {
            producto.dateTime=new Date().toLocaleString();
            let resultado = await knex('productos').insert(producto);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            let productos = await knex('productos').where('id', '=', id).del()
            return productos;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new Productos();