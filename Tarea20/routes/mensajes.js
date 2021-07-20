const express = require('express');
const router = express.Router();
const controlador = require('../api/mensajes');

router.get('/',(request,response)=>{
    response.redirect('/')
})

//se ejecuta el metodo de listar
router.get('/listar',async(request,response) => { 
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
        let mensaje=request.body
        return response.json(controlador.agregar(mensaje))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }     
})

//se ejecuta el metodo de eliminar por id
router.get('/eliminar/:id',async(request,response)=>{
    try{
        await controlador.eliminar(request.params.id)
        response.json({'items':await controlador.listar()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})
 


module.exports = router