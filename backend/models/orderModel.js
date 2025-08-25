const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {type: String, require},
    email: {type: String, require},
    userId: {type: String, require},
    orderItems: [],
    orderAmount: {type: Number, require},
    transactionId: {type: String, require},
    isDelivered : {type:Boolean , require , default: false}
}, {timestamps: true})

module.exports = mongoose.model('orders', orderSchema)