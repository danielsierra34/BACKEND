const fs = require('fs')

class ControladorMensajes {

    constructor(filename) {
        this.fileName='database/filesystem/mensajes.txt'
    }
 
    listar() { 
        try{
            const mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return mensajes
        }catch (error){            
            console.log(error)
        } 
    }

    buscar(id) {
        try{
            const mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return mensajes.filter(x => x.id==parseInt(id))
        }catch (error){            
            console.log(error)
        } 
    }

    agregar(objeto) {
        try{
            const mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            objeto.id=mensajes.length
            mensajes.push(objeto)
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(mensajes))
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
            let mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            mensajes=mensajes.filter(x => x.id != id) 
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(mensajes))
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
            const mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            let mensaje=mensajes.find(x => x.id == parseInt(id));
            mensaje.title = objeto.title
            mensaje.price = objeto.price
            mensaje.thumbnail = objeto.thumbnail
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(mensajes))
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

module.exports = new ControladorMensajes();