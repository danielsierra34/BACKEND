const fs = require('fs')


const Productos = require('./productos')
const instanciaProductos = new Productos("productos.txt");


class Carrito {

    constructor(filename) {
        this.fileName='database/'+filename
    }

    read(id) {
        try{
            const carrito=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return id ? carrito.filter(x => x.id==parseInt(id)):carrito
        }catch (error){            
            console.log(error)
        } 
    }

    write(objeto) {
        try{
            const item=instanciaProductos.read(objeto.id)
            
            const carrito=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            item[0].idx=carrito.length
            item[0].quantity=parseInt(objeto.quantity)
            carrito.push(item[0])
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(carrito))
                try{
                    return (JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
                }catch (error){            
                    console.log(error)
                } 
            }catch (error){
                console.log(error)
            }
        }catch (error){
            console.log(error)
        }
    }

    edit(objeto, id) {
        try{
            const carrito=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            let item=carrito.find(x => x.id == parseInt(id));
            item.quantity = objeto.quantity
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(carrito))
                try{
                    return (JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
                }catch (error){            
                    console.log(error)
                } 
            }catch (error){
                console.log(error)
            }
        }catch (error){
            console.log(error)
        }
    }
    delete(id) {
        try{
            let carrito=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            carrito=carrito.filter(x => x.id != id) 
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(carrito))
                try{
                    return (JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
                }catch (error){            
                    console.log(error)
                } 
            }catch (error){
                console.log(error)
            }
        }catch (error){
            console.log(error)
        }
    }

}

module.exports = Carrito;