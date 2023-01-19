const mongoose = require("mongoose");

const product_schema=mongoose.Schema({
    img:String,
    title:String,
    description:String,
    price:String,
    category:String
})

const product_model=mongoose.model("products",product_schema);
const female_model=mongoose.model("female",product_schema);
const male_model=mongoose.model("male",product_schema);
module.exports={product_model,female_model,male_model};