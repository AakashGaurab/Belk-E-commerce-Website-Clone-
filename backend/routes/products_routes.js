const express=require("express");
const product=express.Router();
const {product_model}=require("../models/products_model");

product.get("/",async (req,res)=>{
    let payload=req.body;
    await product_model.insertMany([payload]);
    let data = await product_model.find({});

    res.json(data);
})



module.exports={product};