const options = require('../config/database');
const knex = require('knex')(options);


(async () => { 

    const articulos = [
        {nombre : 'Articulo 1', codigo : '00000001', precio : 5600, stock : 11},
        {nombre : 'Articulo 2', codigo : '00000002', precio : 12333, stock : 41},
        {nombre : 'Articulo 3', codigo : '00000003', precio : 3456, stock : 32},
        {nombre : 'Articulo 4', codigo : '00000004', precio : 7654, stock : 13},
        {nombre : 'Articulo 5', codigo : '00000005', precio : 1111, stock : 15},
    ]
    try {
        await knex.schema.dropTableIfExists('articulos')
    
        await knex.schema.createTable('articulos', table => {
            table.increments('id').notNullable();
            table.string('nombre',15).notNullable();;
            table.string('codigo',10).notNullable(); ;
            table.float('precio');
            table.integer('stock');
        });

        await knex('articulos').del()

        await knex('articulos').insert(articulos)

        let rows = await knex.from('articulos').select('*')
        for (row of rows){
            console.log(row)
        }

        await knex.from('articulos').where('id','=','3').del()

        await knex.from('articulos').where('id','=','2').update({stock:0})

    } catch(error){
        console.log(error)
    } finally{
        await knex.destroy()
    }
})()