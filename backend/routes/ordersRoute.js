const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const Order = require('../models/orderModel');
const { ORDER_STATUS, PLACED_ORDERS } = Order;
const { requireAuth, requireAdmin, emailList } = require('../middleware/auth');
const { priceCart, CartError } = require('../services/cartPricing');
const razorpay = require('../services/razorpay');

const FREE_ORDER_EMAILS = emailList(process.env.FREE_ORDER_EMAILS);
const FREE_ORDER_LIMIT = 700;

const isEligibleForFreeOrder = async (email) =>
    FREE_ORDER_EMAILS.includes(email.toLowerCase()) &&
    (await Order.countDocuments({ email, ...PLACED_ORDERS })) === 0;

router.post("/check-eligibility", requireAuth, async (req, res) => {
    try {
        return res.json({ eligible: await isEligibleForFreeOrder(req.user.email) });
    } catch (error) {
        return res.status(500).json({ message: "Error checking eligibility" });
    }
});

router.post("/placeOrder", requireAuth, async (req, res) => {
    try {
        const { cartItems, shippingAddress } = req.body;
        const { email, name } = req.user;

        if (!shippingAddress || !String(shippingAddress).trim()) {
            return res.status(400).json({ message: "Shipping address is required" });
        }

        const { orderItems, totalAmount } = await priceCart(cartItems);
        const orderFields = { name, email, userId: email, orderItems, shippingAddress, isDelivered: false };

        if (totalAmount <= FREE_ORDER_LIMIT && await isEligibleForFreeOrder(email)) {
            const newOrder = await Order.create({
                ...orderFields,
                orderAmount: 0,
                transactionId: 'FREE_PROMO_FIRST_ORDER',
                status: ORDER_STATUS.PAID,
            });
            return res.status(200).json({
                message: "Order placed successfully (Free First Order)",
                isFree: true,
                orderId: newOrder._id
            });
        }

        if (!razorpay.isConfigured()) {
            console.error('Razorpay credentials not configured');
            return res.status(500).json({ message: "Payment gateway not configured" });
        }

        const razorpayOrder = await razorpay.client().orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        });

        await Order.create({
            ...orderFields,
            orderAmount: totalAmount,
            razorpayOrderId: razorpayOrder.id,
            status: ORDER_STATUS.PENDING,
        });

        res.status(200).json({ data: razorpayOrder, calculatedAmount: totalAmount });
    } catch (error) {
        if (error instanceof CartError) {
            return res.status(400).json({ message: error.message });
        }
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/verify", requireAuth, async (req, res) => {
    try {
        const response = req.body.response || {};

        if (!razorpay.isValidPaymentSignature(response)) {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }

        const order = await razorpay.markOrderPaid(response.razorpay_order_id, response.razorpay_payment_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found for this payment" });
        }
        return res.status(200).json({ message: "Payment verified successfully!", orderId: order._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
})

router.post("/getuserorders", requireAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.email, ...PLACED_ORDERS }).sort({ _id: -1 })
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get("/getallorders", requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find(PLACED_ORDERS).sort({ createdAt: -1 })
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.post("/deliverorder", requireAdmin, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.body.orderid }).exec()
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.isDelivered = true
        await order.save()
        res.send('Order Delivered Successfully')
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong!" });
    }
});

module.exports = router;
