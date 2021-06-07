const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
let frase='Hola, cómo están? están todos bien?'
const puerto = 8080;



app.get('/',(request,response)=>{
    response.send('Bienvenido a la tarea de Express avanzado 1')
})

app.get('/api/getFrase',(request,response)=>{
    response.send(frase)
    console.log(frase)
})

app.get('/api/getPalabra/:palabra',(request,response)=>{
    let getPalabra=frase.split(' ')
    if(request.params.palabra)
    response.send(getPalabra[parseInt(request.params.palabra) - 1])
})

app.get('/api/getLetra/:letra',(request,response)=>{
    let getLetra=frase.split('')
    if(request.params.letra)
    response.send(getLetra[parseInt(request.params.letra) - 1])
})

app.get('/api/mensajes',(request,response)=>{
    response.send("este es el mensaje")
    console.log(frase)
})  

app.post('/api/guardar',(req,res)=>{
    let palabra=req.body.palabra
    frase+=palabra
    console.log(frase)
    return res.json({"Palabra Insertada":palabra,"frase final": frase})
})

app.put('/api/mensajes/:id',(req,res)=>{
    return res.json({"hola":"daniel", id: req.params.id})
})



const server = app.listen(puerto,()=>{
console.log(`servidor escuchando en http://localhost:${puerto}`)
})