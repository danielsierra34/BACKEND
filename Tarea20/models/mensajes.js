const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongoose.Schema({
    email: { type: String, require: true, max: 200 },
    mensaje: { type: String, require: true, max: 500 },
}, {strict: false});

const Mensaje = mongoose.model('mensajes', schema);

module.exports = Mensaje;