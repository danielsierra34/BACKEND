
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

/*MIDDLEWARE*/
const middleware = (req,res,next) => {
    if(isNaN(req.query.num1) || isNaN(req.query.num2))
    return res.status(400).send('Ingrese valores numéricos')
    next();
}

//Proteccion excepciones no atrapadas
app.use((err,req,res,next) => {
    console.error(err.message)
    return res.status(500).send('algo se rompio')
})


app.get('/', (req,res) => {
    res.send('Esta es la ruta principal')
})
 
const router = require('./routes/productos')
//app.use('/api',middleware)
app.use('/api', router)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,() => {
    console.log("servidor escuchando")
})






















/*
import fs from 'fs';
import bodyParser from "body-parser";
import Archivo from './modules/Archivo.js';

const archivo = new Archivo('productos.txt');
app.use(bodyParser.json());
*/
