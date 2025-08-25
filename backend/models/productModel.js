const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {type: String, required: true},
    varients: [],
    prices: [],
    category: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    show : {type: Boolean, required: true, default: true}
}, {
    timestamps: false,
})

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;