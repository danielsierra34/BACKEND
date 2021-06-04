const express = require('express');
const fs = require('fs')
const app = express()
const puerto = 8080;
let contador={
    items:0,
    item:0
};
app.get('/',(request,response)=>{
    console.log('request recibido')
    response.send('<h1 style="color:blue">Bienvenidos al servidor de DaNiEl')
})

app.get('/items',(request,response)=>{
    contador.items++;
    try{
        const productos=JSON.parse(fs.readFileSync('productos.txt','utf-8'));
        response.json({'items':productos,'cantidad':productos.length})
    }catch (error){
        response.send('<h1 style="color:blue">El registro no existe.')
    }    
})

app.get('/item-random',(request,response)=>{
    contador.item++
    try{
        const productos=JSON.parse(fs.readFileSync('productos.txt','utf-8'));
        response.json({'item':productos[Math.floor(Math.random() * productos.length)]})
    }catch (error){
        response.send('<h1 style="color:blue">El registro no existe.')
    }   
})

app.get('/visitas',(request,response)=>{
    contador.items++;
    response.json({'visitas':contador})
})

/*app.fyh('/',(request,response)=>{
    console.log('request recibido')
    response.send('Hola soy la ruta principal')
})

app.get('/ ',(request,response)=>{
    console.log('request recibido')
    response.json({msg:'hola soy la ruta mensajes'})
})
*/

const server = app.listen(puerto,()=>{
console.log(`servidor escuchando en http://localhost:${puerto}`)
})