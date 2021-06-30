const express = require('express')
const router = express.Router()

const Carrito = require('../api/carrito')
const instancia = new Carrito("carrito.txt");


router.get('/',(request,response)=>{
    response.render('bienvenida')
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

router.post('/agregar',(request,response)=>{    
    try{
        let producto=request.body
        return response.json(instancia.write(producto))
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