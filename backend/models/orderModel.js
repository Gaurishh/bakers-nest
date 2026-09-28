const mongoose = require('mongoose');

// Orders created before `status` existed have no status field and are all paid.
const ORDER_STATUS = { PENDING: 'pending', PAID: 'paid' };

const orderSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    orderItems: [],
    orderAmount: { type: Number, required: true },
    transactionId: { type: String },
    razorpayOrderId: { type: String, index: { unique: true, sparse: true } },
    status: { type: String, enum: Object.values(ORDER_STATUS) },
    isDelivered: { type: Boolean, required: true, default: false },
    shippingAddress: { type: String, required: false }
}, { timestamps: true })

const Order = mongoose.model('orders', orderSchema);

const PLACED_ORDERS = { status: { $ne: ORDER_STATUS.PENDING } };

module.exports = Order;
module.exports.ORDER_STATUS = ORDER_STATUS;
module.exports.PLACED_ORDERS = PLACED_ORDERS;
