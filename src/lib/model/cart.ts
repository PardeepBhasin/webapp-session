import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    ingredients: Array<String>,
    image: String
})

const cartModel = mongoose.models.cart || mongoose.model('cart', schema);

export default cartModel;