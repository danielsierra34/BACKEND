const express = require('express')
const router = express.Router()
const controlador = require('../api/productos');


router.get('/vista-test/:cant',async(request,response)=>{
    try{
        response.render('index',{productos: await controlador.listarRandom(request.params.cant)});
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

//se ejecuta el metodo de listar
router.get('/listar',async(request,response)=>{
    try{
        response.json(await controlador.listar())
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

//se ejecuta el metodo de listar por id
router.get('/buscar/:id',async(request,response)=>{
    try{
        response.json(await controlador.buscar(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

//se ejecuta el metodo de agregar
router.post('/agregar',(request,response)=>{    
    try{
        let producto=request.body
        return response.json(controlador.agregar(producto))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } 
    
})

 
router.get('/eliminar/:id',async(request,response)=>{
    console.log(request.params.id)
    try{
        await controlador.eliminar(request.params.id)
        let productos=await controlador.listar()
        return response.json(productos)
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

//se ejecuta el metodo de editar por id
router.put('/editar/:id',(request,response)=>{
    try{
        let producto=request.body
        return response.json(controlador.editar(producto,request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

module.exports = router