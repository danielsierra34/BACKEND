const options = require('./database/config');
const knex = require('knex')(options);


(async () => { 

    const mensajes = [
        {mensaje : 'mensaje 1', email : 'danielsierra34@gmail.com', dateTime : 'ninguno'},
        {mensaje : 'mensaje 2', email : 'danielsierra34@gmail.com', dateTime : 'ninguno'},
        {mensaje : 'mensaje 3', email : 'danielsierra34@gmail.com', dateTime : 'ninguno'},
        {mensaje : 'mensaje 4', email : 'danielsierra34@gmail.com', dateTime : 'ninguno'},
        {mensaje : 'mensaje 5', email : 'danielsierra34@gmail.com', dateTime : 'ninguno'},
    ]

    const productos = []

    for (let i = 0; i < 50; i++) {
        var producto={title : `Producto ${Math.floor(Math.random() * 10000) + 99999}`, price : Math.floor(Math.random() * 10000) + 99999, thumbnail : `https://picsum.photos/${Math.floor(Math.random() * 250) + 200}`, stock : Math.floor(Math.random() * 60) + 11, description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in mauris imperdiet, aliquam ex ac, hendrerit risus. Donec eu posuere est. Nulla tempus ligula vel lectus pulvinar gravida. Sed in lobortis velit. Suspendisse consectetur lobortis neque nec sollicitudin. Praesent egestas ac mi in posuere. Nulla facilisi. In scelerisque posuere lobortis. Curabitur in nisl bibendum, suscipit dui non, imperdiet velit. Nam pretium diam efficitur arcu viverra eleifend.'}
        productos.push(producto)
    }

    try {

        /***INICIALIZAR MENSAJES*******/
        await knex.schema.dropTableIfExists('mensajes')
    
        await knex.schema.createTable('mensajes', table => {
            table.increments('id').notNullable();
            table.string('email',100).notNullable();
            table.string('mensaje',100).notNullable();
            table.string('dateTime',100).notNullable();
        });

        await knex('mensajes').del()

        await knex('mensajes').insert(mensajes)

        /***INICIALIZAR PRODUCTOS*******/
        await knex.schema.dropTableIfExists('productos')
    
        await knex.schema.createTable('productos', table => {
            table.increments('id').notNullable();
            table.string('title',100).notNullable();
            table.float('price').notNullable();
            table.integer('stock').notNullable();
            table.string('description',500).notNullable();
            table.string('thumbnail',500).notNullable();
            table.string('dateTime',100)
        });

        await knex('productos').del()

        await knex('productos').insert(productos)

        /***INICIALIZAR CARRITO*******/
        await knex.schema.dropTableIfExists('carrito')
    
        await knex.schema.createTable('carrito', table => {
            table.increments('id').notNullable();
            table.string('title',100).notNullable();
            table.float('price').notNullable();
            table.integer('stock').notNullable();
            table.string('description',500).notNullable();
            table.string('thumbnail',500).notNullable();
            table.integer('idx').notNullable();
            table.integer('quantity').notNullable();
            table.float('total').notNullable();
            table.string('dateTime',100)
        });

        await knex('carrito').del()

        await knex('carrito').insert(carrito)
        


    } catch(error){
        console.log(error)
    } finally{
        await knex.destroy()
    }
})()