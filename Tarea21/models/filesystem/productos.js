const fs = require('fs')

class ControladorProductos {

    constructor(filename) {
        this.fileName='database/filesystem/productos.txt'
    }
 
    listar() { 
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return productos
        }catch (error){            
            console.log(error)
        } 
    }

    buscar(id) {
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return productos.filter(x => x.id==parseInt(id))
        }catch (error){            
            console.log(error)
        } 
    }

    agregar(objeto) {
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            objeto.id=productos.length
            productos.push(objeto)
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(productos))
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

    eliminar(id) {
        try{
            let productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            productos=productos.filter(x => x.id != id) 
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(productos))
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
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            let producto=productos.find(x => x.id == parseInt(id));
            producto.title = objeto.title
            producto.price = objeto.price
            producto.thumbnail = objeto.thumbnail
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(productos))
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

module.exports = new ControladorProductos();