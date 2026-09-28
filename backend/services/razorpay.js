const crypto = require("crypto");
const RazorPay = require("razorpay");
const Order = require("../models/orderModel");
const { ORDER_STATUS } = Order;

const isConfigured = () => Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

const client = () => new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const hmacMatches = (payload, secret, signature) => {
    if (typeof signature !== "string") return false;
    const expected = Buffer.from(crypto.createHmac("sha256", secret).update(payload).digest("hex"));
    const received = Buffer.from(signature);
    return expected.length === received.length && crypto.timingSafeEqual(expected, received);
};

const isValidPaymentSignature = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) =>
    hmacMatches(`${razorpay_order_id}|${razorpay_payment_id}`, process.env.RAZORPAY_KEY_SECRET, razorpay_signature);

const isValidWebhookSignature = (rawBody, signature) =>
    Boolean(process.env.RAZORPAY_WEBHOOK_SECRET) &&
    hmacMatches(rawBody, process.env.RAZORPAY_WEBHOOK_SECRET, signature);

// Idempotent: returns the order once paid, or null if no order of ours matches the Razorpay order.
const markOrderPaid = async (razorpayOrderId, paymentId) => {
    const updated = await Order.findOneAndUpdate(
        { razorpayOrderId, status: ORDER_STATUS.PENDING },
        { status: ORDER_STATUS.PAID, transactionId: paymentId },
        { new: true },
    );
    return updated || Order.findOne({ razorpayOrderId, status: ORDER_STATUS.PAID });
};

module.exports = { isConfigured, client, isValidPaymentSignature, isValidWebhookSignature, markOrderPaid };
