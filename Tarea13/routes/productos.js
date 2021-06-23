const express = require('express')
const router = express.Router()

const Productos = require('../api/productos')
const instancia = new Productos("productos.txt");


router.get('/',(request,response)=>{
    response.render('bienvenida')
})

router.get('/vista',(request,response) => {
    try{
        response.render('main', {productos:instancia.read(),hayProductos:true})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }
})

router.get('/crear',(request,response) => {
    try{
        response.render('createProduct')
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }
})

router.get('/listar',(request,response)=>{
    try{
        response.json({'items':instancia.read()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.get('/listar/:id',(request,response)=>{
    try{
        response.json(instancia.read(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.post('/guardar',(request,response)=>{
    
    try{
        let producto=request.body
        return response.json(instancia.write(producto))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } 
    
})

router.put('/editar/:id',(request,response)=>{
    try{
        let producto=request.body
        return response.json(instancia.edit(producto,request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

router.delete('/eliminar/:id',(request,response)=>{
    try{
        return response.json(instancia.delete(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

module.exports = router