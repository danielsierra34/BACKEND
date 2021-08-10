const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy 

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret:"xxx",
    resave:false,
    saveUninitialized:false
}))

const usuarios = []
app.post('/', (req, res) => {    
    res.send('Servidor express ok!');
});

app.post('/registrar', (req, res) => {
    let usuario=req.body
    console.log(usuario)
    let existe=usuarios.find(u => u.username == usuario.username)
    if(existe){
        return res.status(400).send(`El usuario ${usuario.username} ya existe.`)
    }
    usuario.password = bcrypt.hashSync(usuario.password,11)
    usuarios.push(usuario)
    console.log(usuarios)
    res.send("El usuario se registro correctamente")
});

app.post('/login', (req, res) => {
    let {username, password} = req.body
    let usuario=usuarios.find(u => u.username == username )
    if(!usuario){
        return res.status(400).send(`El usuario no se encuentra registrado.`)
    }
    if(usuario.username == username && bcrypt.compareSync(password,usuario.password)){
        req.session.username = username 
        res.send("Bienvenido") 
    }else{
        res.send("credenciales invalidas") 
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.send("adios") 
});

const auth = (req, res, next) => {
    if (req.session && req.session.username){
        return next()
    }else{
        return res.sendStatus(401).send("no autorizado")
    }
}

app.post('/datos', auth, (req, res) => {
    res.send(req.session)
})

const PORT = 8080; 

app.listen(PORT, () => {
    console.log("servidor en localhost")
})