import fs from 'fs'
export default function Products(fileName){
    this.fileName=fileName
    this.read=function(){
        try{
            return (JSON.parse(fs.readFileSync(this.fileName,'utf-8')))
        }catch (error){            
            console.log(error)
        } 
    }
    this.write=function(objeto){       
        objeto.id=JSON.stringify(objeto).length
        try{
            const productos=JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
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
    this.unlink=function(){
        try{
            fs.unlinkSync(this.fileName)
            return true
        }catch (error){
            return error
        }  
    }
}
