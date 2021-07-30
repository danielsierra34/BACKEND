const admin = require('firebase-admin')
const account = require('../../database/firebase/key.json')
admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "tienda-de-daniel.firebaseio.com"
});

const db = admin.firestore();
const query = db.collection('productos');


class ControladorProductos {

    constructor() { }

    async listar() {
        try{
            const productos = await query.get()            
            return  productos.docs.map(doc => doc.data())
        }catch (error){            
            console.log(error)
        }       
    }
    async buscar(id) {
        const productos = await db.collection('productos').where('id','==',parseInt(id)).get()            
        return productos.docs.map(doc => doc.data())
    }
    async agregar(producto) {
        try{
            await query.add(producto);
        }catch (error){
            console.log(error)
        }
       
    }
    async eliminar(id) {
        let doc = query.doc(id);
        item = await doc.delete();
    }
    async actualizar(id){
        /*
       
        //UPDATE
        let id = usuarios[0].id;
        let doc = query.doc(id);
        let item = await doc.update({ edad: 100 });
        console.log(`usuario con id ${id} actualizado!`, item);
        */
    }
    
}

module.exports = new ControladorProductos();    