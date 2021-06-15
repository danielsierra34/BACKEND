const express = require('express')
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.set('views','./views') 
app.set('view engine', 'pug')

app.get('/', (req,res) => {
    res.send('Esta es la ruta principal')
})

app.get('/hello', (req,res) => {
    res.render('hello.pug', {mensaje: 'Usando Pugjs desde express'})
})
 
const router = require('./routes/productos')
//app.use('/api',middleware)
app.use('/api', router)

const PORT = 8080

const server = app.listen(PORT,() => {
    console.log("servid or escuchando")
})

server.on('error',error => {
    console.log('error en el serivodr: ',error)
})




/*MIDDLEWARE*/
/*const middleware = (req,res,next) => {
    if(isNaN(req.query.num1) || isNaN(req.query.num2)){
        return res.status(400).send('Ingrese valores numéricos')
    }   
    next();
}*/

//Proteccion excepciones no atrapadas
/*app.use((err,req,res,next) => {
    console.error(err.message)
    return res.status(500).send('algo se rompio')
})*/
