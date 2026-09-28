const mongoose = require("mongoose");
const Product = require("../models/productModel");

const MAX_QUANTITY = 10;

class CartError extends Error {}

// Rebuilds the cart from DB prices; the client only chooses product, variant and quantity.
const priceCart = async (cartItems) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new CartError("Cart items are required");
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cartItems) {
        const quantity = Number(item && item.quantity);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
            throw new CartError(`Quantity must be between 1 and ${MAX_QUANTITY}`);
        }
        if (!mongoose.isValidObjectId(item._id)) {
            throw new CartError("Invalid product in cart");
        }

        const product = await Product.findById(item._id);
        if (!product || product.show === false) {
            throw new CartError("A product in your cart is no longer available");
        }

        const priceTable = product.prices[0] || {};
        const unitPrice = Number(priceTable[item.varient]);
        if (!Object.prototype.hasOwnProperty.call(priceTable, item.varient) || !Number.isFinite(unitPrice) || unitPrice <= 0) {
            throw new CartError(`"${item.varient}" is not available for ${product.name}`);
        }

        const lineTotal = unitPrice * quantity;
        totalAmount += lineTotal;
        orderItems.push({
            _id: product._id,
            name: product.name,
            image: product.image,
            category: product.category,
            varient: item.varient,
            quantity,
            price: lineTotal,
        });
    }

    return { orderItems, totalAmount };
};

module.exports = { priceCart, CartError };
