const fs = require('fs')
function Archivo(fileName){
    this.fileName=fileName
    this.read=function(){
        try{
            return(JSON.parse(fs.readFileSync(fileName,'utf-8')))
        }catch (error){
            return false
        } 
    }
    this.write=function(objeto){
        try{
            fs.writeFileSync(fileName,objeto)
            return true
        }catch (error){
            return false
        } 
    }
    this.unlink=function(){
        try{
            fs.unlinkSync(fileName)
            return true
        }catch (error){
            return false
        } 
    }

}

const producto={
    title:'titulo del producto',
    price:12345,
    thumbnail:'aca va el thumbnail',
    id:'aca va el id'
}
  
let archivo=new Archivo('productos.txt')
productos=archivo.read()
productos.push(producto)
archivo.unlink('productos.txt')
console.log(productos) 
archivo.write(JSON.stringify(productos))
productos=archivo.read()
console.log(productos) 
