const admin = require('firebase-admin')
const account = require('../../database/firebase/key.json')
/*admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "tienda-de-daniel.firebaseio.com"
});*/

const db = admin.firestore();
const query = db.collection('mensajes');



class ControladorMensajes {

    constructor() { }

    async listar() {
        try{
            const mensajes = await query.get()            
            return  mensajes.docs.map(doc => doc.data())
        }catch (error){            
            console.log(error)
        }       
    }
    async buscar(id) {
        const mensajes = await db.collection('mensajes').where('id','==',parseInt(id)).get()            
        return mensajes.docs.map(doc => doc.data())
    }
    async agregar(mensaje) {
        try{
            await query.add(mensaje);
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

module.exports = new ControladorMensajes();