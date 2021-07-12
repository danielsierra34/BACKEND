const options = require('./database/config');
const knex = require('knex')(options);


(async () => { 

    

    try {

        /***INICIALIZAR MENSAJES*******/
        await knex.destroy()

    } catch(error){
        console.log(error)
    } finally{
        await knex.destroy()
    }
})()