const express = require('express')
const router = express.Router()

const Mensajes = require('../api/mensajes')
const instancia = new Mensajes("mensajes.txt");


router.get('/',(request,response)=>{
    response.render('bienvenida')
})

router.get('/vista',(request,response) => {
    /*try{
        response.render('main', {mensajes:instancia.read(),haymensajes:true})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }*/
})

router.get('/crear',(request,response) => {
    /*try{
        response.render('createProduct')
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }*/
})

router.get('/listar',(request,response)=>{
    /*try{
        response.json({'items':instancia.read()})
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }  */  
})

router.get('/listar/:id',(request,response)=>{
    /*try{
        response.json(instancia.read(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } */   
})

router.post('/guardar',(request,response)=>{
    
    try{
        let mensaje=request.body
        mensaje.dateTime=new Date().toLocaleString();
        return response.json(instancia.write(mensaje))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } 
    
})

router.put('/editar/:id',(request,response)=>{
    /*try{
        let mensaje=request.body
        return response.json(instancia.edit(mensaje,request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    } */  
    
})

router.delete('/eliminar/:id',(request,response)=>{
    /*try{
        return response.json(instancia.delete(request.params.id))
    }catch (error){
        response.json({"error": "Intente de nuevo más tarde"})
    }*/   
    
})

module.exports = router