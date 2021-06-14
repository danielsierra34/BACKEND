const express = require('express')
const handlebars = require('express-handlebars')
const app = express()







app.engine('hbs',handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}))

app.set('view engine', 'hbs')
app.set('views','./views') 



app.use(express.json());
app.use(express.urlencoded({extended:true}))

/*MIDDLEWARE*/
/*const middleware = (req,res,next) => {
    if(isNaN(req.query.num1) || isNaN(req.query.num2))
    return res.status(400).send('Ingrese valores numéricos')
    next();
}*/

//Proteccion excepciones no atrapadas
/*app.use((err,req,res,next) => {
    console.error(err.message)
    return res.status(500).send('algo se rompio')
})*/


app.get('/', (req,res) => {
    res.send('Esta es la ruta principal')
})
 
const router = require('./routes/productos')
//app.use('/api',middleware)
app.use('/api', router)

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,() => {
    console.log("servid or escuchando")
})

server.on('error',error => {
    console.log('error en el serivodr: ',error)
})