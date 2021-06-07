


import Archivo from './modules/products.js';
const archivo = new Products('productos.txt');
const express = require('express');

const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
const puerto = 8080;

app.get('/',(request,response)=>{
    console.log('request recibido')
    response.send('<h1 style="color:blue">Bienvenidos a la tarea de Express')
})
.get('/api/productos/listar',(request,response)=>{
    productos=archivo.read()
    console.log(JSON.stringify(productos))
}) 















// se lee el archivo.
//el metodo read() internamente tiene la impresion en consola.
archivo.read()

// se genera un objeto cualquiera
const objeto={
    title:'producto 1',
    price:500, 
    thumbnail:'https://imgfaker.com'
}
// se pasa como parametro al metodo write 
//internamente este meto se encarga de:
//1.Leer er archivo
//2.Parsearlo como una coleccion
//3.agregar el objeto a la coleccion
//4.convertir la coleccion en un string 
//5.guardar el string en un archivo
//6.leer nuevamente el archivo e imprimirlo en la consola
archivo.write(objeto) 



const express = require('express');
const fs = require('fs')
const app = express()
const puerto = 8080;

app.get('/',(request,response)=>{
    console.log('request recibido')
    response.send('<h1 style="color:blue">Bienvenidos al servidor de DaNiEl')
})

app.get('/api/items',(request,response)=>{
    try{
        const productos=JSON.parse(fs.readFileSync('productos.txt','utf-8'));
        response.json({'items':productos})
    }catch (error){
        response.send('<h1 style="color:blue">El registro no existe.')
    }    
})

app.post('/api/items',(request,response)=>{
    try{
        const productos=JSON.parse(fs.readFileSync('productos.txt','utf-8'));
        response.json({'items':productos})
    }catch (error){
        response.send('<h1 style="color:blue">El registro no existe.')
    }    
})



const server = app.listen(puerto,()=>{
console.log(`servidor escuchando en http://localhost:${puerto}`)
})