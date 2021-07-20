const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({
    title: { type: String, require: true, max: 100 },
    price: { type: Number, require: true},
    thumbnail: { type: String, require: true, max:1000 },
    id: { type: Number, require: true },
    stock: { type: Number, require: true},
    description: { type: String, require: true }
}, {strict: true});

const Producto = mongoose.model('productos', schema);

module.exports = Producto;