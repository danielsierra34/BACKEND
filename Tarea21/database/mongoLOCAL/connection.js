const mongoose = require('mongoose');
const connection = mongoose.connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', "mongodb://localhost:27017/ecommerce");
});
mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});
mongoose.model('productos', schema);
mongoose.Schema()
module.exports = connection;



export class MongoDB {
 constructor(URL) {
        this.URL = URL
        process.on('exit', () => {
            this.close()
        })
    }
    async conectar(URL) {
        try {
            await mongoose.connect(this.URL, { useNewUrlParser: true, useUnifiedTopology: true })
        }
        catch(err) {
            console.log(`MongoDB: Error en conectar ${err}`)
        }        
    }
    close() {
        console.log('Cerrando conexión MongoDB!');
    }
}