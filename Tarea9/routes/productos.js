const express = require('express')
const router = express.Router()

const Productos = require('../api/productos')
const instancia = new Productos("productos.txt");

router.use(express.static('public'));


router.get('/',(request,response)=>{
    console.log('request recibido')
    //response.send('<h1 style="color:blue">Bienvenidos al servidor de DaNiEl')
    response.sendFile('index')
})

router.get('/listar',(request,response)=>{
    try{
        response.json({'items':instancia.read()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.get('/listar/:id',(request,response)=>{
    console.log(request.params.id)
    try{
        response.json(instancia.read(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.post('/guardar',(request,response)=>{
    try{
        let producto=request.body
        return response.json({"inserción":{"producto": producto}, "resultado": {"productos": instancia.write(producto)}})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } 
    
})

router.put('/editar/:id',(request,response)=>{
    try{
        let producto=request.body
        return response.json({"edición":{"producto": producto}, "resultado": {"productos": instancia.edit(producto,request.params.id)}})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

router.delete('/eliminar/:id',(request,response)=>{
    console.log(request.params.id) 
    try{
        return response.json({"resultado": {"productos": instancia.delete(request.params.id)}})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

module.exports = router