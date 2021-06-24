const fs = require('fs')

class Mensajes {

    constructor(filename) {
        this.fileName='database/'+filename
    }

    read() {
        try{
            const mensajes=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            return mensajes
        }catch (error){            
            console.log(error)
        } 
    }

    write(objeto) {
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

}

module.exports = Mensajes;