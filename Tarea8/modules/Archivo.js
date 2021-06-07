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
}
