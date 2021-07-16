const Carrito = require('../models/carrito');
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
    async agregar(item) {        
        let itemx=await Productos.findById(item.id)
        itemx[0].quantity=parseInt(item.quantity)
        itemx[0].total=parseInt(item.quantity)*itemx[0].price  
        itemx[0].dateTime=new Date().toLocaleString();
        itemx[0].idx=itemx[0].id
        delete itemx[0].id;
        try {
            return await Carrito.create(itemx);
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