const http = require('http')
const server = http.createServer((peticion,respuesta) => {
  let hora = new Date.getHours();
  let mensaje= (hora<12)?"buenos dias":(hora<18)?"buenos tardes":"buenos noches"
   
}) 

server.listen(3000,function(){
    console.log(`El servidor esta escuchando en el puerto ${this.address().port}`)
    console.log(hora)
}) 