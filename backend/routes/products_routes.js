const express=require("express");
const product=express.Router();
const {product_model,female_model,male_model}=require("../models/products_model");

product.get("/",async (req,res)=>{
    let data = await product_model.find({});

    res.json(data);
})

product.post("/add",async (req,res)=>{
    if (req.body.category=="female"){
        let payload = req.body;
        try {
            await female_model.insertMany([payload]);
            res.json("product uploaded")
        } catch (error) {
           res.json("Error uploading product") 
        }
    }
    else if (req.body.category=="male"){
        let payload = req.body;
        try {
            await male_model.insertMany([payload]);
            res.json("product uploaded")
        } catch (error) {
           res.json("Error uploading product") 
        }
    }
     
})

product.delete("/",async (req,res)=>{
    await male_model.deleteMany({});
    res.send("Data Deleted ") 
})



module.exports={product};