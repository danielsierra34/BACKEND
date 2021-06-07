import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";
import Archivo from './modules/Archivo.js';
const app = express();
const archivo = new Archivo('productos.txt');
app.use(bodyParser.json());
const puerto = 8080;

app.get('/',(request,response)=>{
    console.log('request recibido')
    response.send('<h1 style="color:blue">Bienvenidos al servidor de DaNiEl')
})

app.get('/api/productos/listar',(request,response)=>{
    try{
        const productos=archivo.read()
        response.json({'items':productos})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

app.get('/api/productos/listar/:id',(request,response)=>{
    try{
        const productos=archivo.read()
        const filtro=productos.filter(item => item.id==request.params.id)
        response.json((filtro.length>0)?filtro: {"error": "Producto no encontrado"})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

app.post('/api/productos/guardar',(request,response)=>{
    try{
    let producto=request.body
    return response.json({"inserción":{"producto": producto}, "resultado": {"productos": archivo.write(producto)}})
}catch (error){
    response.json({"error": "Intente de nuevo más tarde"})
} 
    
})



const server = app.listen(puerto,()=>{
console.log(`servidor escuchando en http://localhost:${puerto}`)
})