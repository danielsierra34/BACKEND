const express = require('express');
const router = express.Router();
const controlador = require('../api/carrito');

router.get('/',(request,response)=>{
    response.redirect('carrito/listar')
}) 

router.get('/listar',async(request,response) => { 
    try{
        response.json({'items':await controlador.listar()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
})

router.get('/buscar/:id',async(request,response)=>{
    try{
        response.json({'item':await controlador.buscar(request.params.id)})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.post('/agregar',(request,response)=>{    
    try{
        let item=request.body
        return response.json(controlador.agregar(item))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }     
})

router.get('/eliminar/:id',async(request,response)=>{
    console.log(1)
    try{
        console.log(request.params.id)
        await controlador.eliminar(request.params.id)
        response.json({'items':await controlador.listar()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})
router.delete('/eliminar/:id',async(request,response)=>{
    try{
        console.log(request.params.id)
        await controlador.eliminar(request.params.id)
        response.json(await controlador.listar())
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})
 


module.exports = router