import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    ingredients: Array<String>,
    image: String
})

const orderModel = mongoose.models.order || mongoose.model('order', schema);

export default orderModel;