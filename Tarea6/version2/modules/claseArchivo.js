import fs from 'fs'
export default class Archivo{
    constructor(fileName) {
        this.fileName = fileName;
    }
    read(){
        try{
            console.log(JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
        }catch (error){            
            console.log(error)
        } 
    }
    write(objeto){       
        objeto.id=JSON.stringify(objeto).length
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
            productos.push(objeto)
            try{
                fs.writeFileSync(this.fileName,JSON.stringify(productos))
                try{
                    console.log(JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
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
    unlink(){
        try{
            fs.unlinkSync(this.fileName)
            return true
        }catch (error){
            return error
        }  
    }
}
