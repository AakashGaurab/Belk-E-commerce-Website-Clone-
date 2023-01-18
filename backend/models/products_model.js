const mongoose = require("mongoose");

const product_schema=mongoose.Schema({
    img:String,
    title:String,
    description:String,
    price:Number,
    category:String
})

const product_model=mongoose.model("products",product_schema);

module.exports={product_model}