const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {type: String, require},
    varients: [],
    prices: [],
    category: {type: String, require},
    image: {type: String, require},
    description: {type: String, require},
    show : {type:Boolean , require , default: true}
}, {
    timestamps: false,
})

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;