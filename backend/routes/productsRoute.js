const express = require("express");
const router = express.Router();
const Product = require('../models/productModel');

router.get("/getallproducts", async (req, res) => {
    try {
        const products = await Product.find({}).sort({category: 1, _id: 1})
        res.send(products)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.get("/getproductsbypage", async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const skip = parseInt(req.query.skip) || 0;
    try {
        // Use skip and limit in the Mongo query
        const products = await Product.find({})
          .sort({ category: 1, _id: 1 })
          .skip(skip)
          .limit(limit);
        res.send(products);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/addproduct", async (req, res) => {
    const product = req.body.product

    try {
        const newProduct = new Product({
            name: product.name,
            image: product.image,
            description: product.description,
            category: product.category,
            prices: product.prices,
            varients: product.varients
        })

        await newProduct.save()
        res.send("New Product added successfully!")
    } catch (error) {
        res.status(400).json({message: error});
    }
});

router.post("/getproductbyid", async(req, res) => {
    const productid = req.body.productid

    try {
        const product = await Product.findOne({_id: productid}).exec();
        res.send(product);
    } catch (error) {
        return res.status(400).json({message: error});
    }

})

router.post("/editproduct", async (req, res) => {
    const editedProduct = req.body.editedProduct;

    try {
        const product = await Product.findOne({_id: editedProduct._id}).exec();
        product.name = editedProduct.name
        product.description = editedProduct.description
        product.image = editedProduct.image
        product.category = editedProduct.category
        product.prices = editedProduct.prices
        product.varients = editedProduct.varients

        await product.save();

        res.send("Product edited successfully!")
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post("/productvisibility", async (req, res) => {
    const productId = req.body.productId;
    const value = req.body.value;

    try {
        const product = await Product.findOne({_id: productId}).exec();
        product.show = value

        await product.save();

        res.send("Product visibility toggled!")
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

router.post("/deleteproduct", async(req, res) => {
    const productid = req.body.productid

    try {
        await Product.findOneAndDelete({_id: productid}).exec()
        res.send("Product deleted successfully!")
    } catch (error) {
        res.status(400).json({message: error});
    }
})

module.exports = router;