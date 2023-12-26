import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    ingredients: Array<String>,
    image: String
})

const productModel = mongoose.models.product || mongoose.model('product', schema);

export default productModel;