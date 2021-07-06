const express = require('express')
const router = express.Router()

const Productos = require('../api/productos')
const instancia = new Productos("productos.txt");


const admin=false;

const validarSession=function (req, res, next) {
    if (admin) {
        next();       
    } else {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    }
}

router.get('/',validarSession,(request,response)=>{
    response.redirect('productos/vista')
})

router.get('/vista',validarSession,(request,response) => { 
    try{
        response.render('main', {productos:instancia.read(),hayProductos:true})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }
})

router.get('/crear',validarSession,(request,response) => {
    try{
        response.render('createProduct')
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }
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

router.post('/guardar',validarSession,(request,response)=>{
    
    try{
        let producto=request.body
        return response.json(instancia.write(producto))
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

router.delete('/eliminar/:id',validarSession,(request,response)=>{
    try{
        return response.json(instancia.delete(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }   
    
})

module.exports = router