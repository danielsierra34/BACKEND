const express = require('express')
const router = express.Router()

const Carrito = require('../api/carrito')
const instancia = new Carrito("carrito.txt");

const admin=false;

const validarSession=function (req, res, next) {
    if (admin) {
        next();       
    } else {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    }
}

router.get('/',validarSession,(request,response)=>{
    response.send('este es el api de carrito')
})


router.get('/listar',validarSession,(request,response)=>{
    try{
        response.json({'items':instancia.read()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.get('/listar/:id',validarSession,(request,response)=>{
    try{
        response.json(instancia.read(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }    
})

router.post('/agregar',validarSession,(request,response)=>{    
    try{
        let producto=request.body
        console.log(producto)
        return response.json(instancia.write(producto))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } 
    
})

router.delete('/eliminar/:id',validarSession,(request,response)=>{
    console.log("se elimino el producto " + request.params.id)
    response.send('se elimino el elemento' + request.params.id)    
    try{
        return response.json(instancia.delete(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }
    
})

router.put('/editar/:id',validarSession,(request,response)=>{
    try{
        let producto=request.body
        return response.json(instancia.edit(producto,request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})


module.exports = router