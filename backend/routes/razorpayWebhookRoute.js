const express = require("express");
const router = express.Router();
const { isValidWebhookSignature, markOrderPaid } = require("../services/razorpay");

const PAID_EVENTS = ["payment.captured", "order.paid"];

// Mounted with express.raw: the signature is computed over the exact request bytes.
router.post("/", async (req, res) => {
    const rawBody = req.body.toString("utf8");
    if (!isValidWebhookSignature(rawBody, req.headers["x-razorpay-signature"])) {
        return res.status(400).json({ message: "Invalid webhook signature" });
    }

    try {
        const event = JSON.parse(rawBody);
        if (!PAID_EVENTS.includes(event.event)) {
            return res.status(200).json({ ignored: event.event });
        }

        const payment = event.payload.payment.entity;
        const order = payment.order_id && await markOrderPaid(payment.order_id, payment.id);
        if (!order) {
            console.warn(`Unmatched Razorpay payment ${payment.id} (order ${payment.order_id}, ${payment.amount} paise, ${payment.email})`);
        }
        return res.status(200).json({ received: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Webhook processing failed" });
    }
});

module.exports = router;
