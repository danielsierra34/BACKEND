const fs = require('fs')

class Productos {

    constructor(filename) {
        this.fileName='database/'+filename
    }

    read(id) {
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return id ? productos.filter(x => x.id==parseInt(id)):productos
        }catch (error){            
            console.log(error)
        } 
    }

    write(objeto) {
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
    delete(id) {
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

}

module.exports = Productos;