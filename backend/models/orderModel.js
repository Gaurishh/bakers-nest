const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: [],
    orderAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    isDelivered: { type: Boolean, required: true, default: false },
    shippingAddress: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model('orders', orderSchema)