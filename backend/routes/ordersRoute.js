const express = require('express');
const router = express.Router();
const RazorPay = require("razorpay");
const crypto = require("crypto");
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

router.post("/placeOrder", async (req, res) => {
    try {
        const { cartItems } = req.body;
        
        if (!cartItems || !Array.isArray(cartItems)) {
            return res.status(400).json({ message: "Cart items are required" });
        }

        let totalAmount = 0;
        
        // Calculate total amount by fetching product prices from database
        for (const item of cartItems) {
            try {
                const product = await Product.findById(item._id);
                if (!product) {
                    return res.status(400).json({ message: `Product with ID ${item._id} not found` });
                }
                
                const variantPrice = product.prices[0][item.varient];
                // console.log("hi");
                // console.log(variantPrice);
                const itemTotal = variantPrice * item.quantity;
                totalAmount += itemTotal;
                
            } catch (error) {
                console.log(`Error processing product ${item._id}:`, error);
                return res.status(500).json({ message: "Error processing product information" });
            }
        }

        // console.log(totalAmount);
        // console.log(cartItems);

        // Check if Razorpay credentials are configured
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay credentials not configured');
            return res.status(500).json({ message: "Payment gateway not configured" });
        }

        const instance = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        instance.orders.create(options, (error, order) => {
            if(error){
                console.log(error);
                return res.status(500).json({message: "Something went wrong!"});
            }
            res.status(200).json({
                data: order,
                calculatedAmount: totalAmount
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.post("/verify", async(req, res) => {
    try {        
        const {response, user, cartItems, calculatedAmount} = req.body;
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = response;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

        if(razorpay_signature === expectedSign){
            const neworder = new Order({
                name : user.name,
                email : user.email,
                userId : user.email,
                orderItems : cartItems , 
                orderAmount : calculatedAmount,
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