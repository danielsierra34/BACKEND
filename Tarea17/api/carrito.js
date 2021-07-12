const Carrito = require('../models/carrito');
const Productos = require('../api/productos');
class ControladorCarrito{

    constructor() { }

    async listar() {
        try {
            return await Carrito.listar();
        } catch (error) {
            throw error;
        }
    }
    async buscar(id) {
        try {
            return await Carrito.buscar(id);
        } catch (error) {
            throw error;
        } 
    }
    async agregar(item) {        
        let itemx=await Productos.buscar(item.id)
        itemx[0].quantity=parseInt(item.quantity)
        itemx[0].total=parseInt(item.quantity)*itemx[0].price  
        itemx[0].dateTime=new Date().toLocaleString();
        itemx[0].idx=itemx[0].id
        delete itemx[0].id;
        try {
            return await Carrito.agregar(itemx);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id) {
        try {
            return await Carrito.eliminar(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControladorCarrito();