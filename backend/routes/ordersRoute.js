const express = require('express');
const router = express.Router();
const RazorPay = require("razorpay");
const crypto = require("crypto");
const Order = require('../models/orderModel');

router.post("/placeOrder", async (req, res) => {
    try {
        const instance = new RazorPay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        instance.orders.create(options, (error, order) => {
            if(error){
                console.log(error);
                return res.status(500).json({message: "Something went wrong!"});
            }
            res.status(200).json({data: order});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.post("/verify", async(req, res) => {
    try {        
        const {response, user, cartItems, amount} = req.body;
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = response;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex");

        if(razorpay_signature === expectedSign){
            const neworder = new Order({
                name : user.name,
                email : user.email,
                userId : user.email,
                orderItems : cartItems , 
                orderAmount : amount,
                transactionId : razorpay_payment_id
            })
            
            neworder.save()
            return res.status(200).json({message: "Payment verified successfully!"});
        }
        else{
            return res.status(400).json({message: "Invalid signature sent!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error!"});
    }
})

router.post("/getuserorders", async(req, res) => {
    const {userId} = req.body
    try {
        const orders = await Order.find({userId : userId}).sort({_id : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get("/getallorders", async(req, res) => {

    try {
        const orders = await Order.find({}).sort({createdAt : -1})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: error});
    }

});

router.post("/deliverorder", async(req, res) => {

   const orderid = req.body.orderid
   try {
       const order = await Order.findOne({_id : orderid}).exec()
       order.isDelivered = true
       await order.save()
       res.send('Order Delivered Successfully')
   } catch (error) {

       return res.status(400).json({ message: "Something went wrong!"});
       
   }
 
});


module.exports = router;