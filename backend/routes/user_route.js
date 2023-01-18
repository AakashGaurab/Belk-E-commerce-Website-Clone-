const express= require("express");
const user=express.Router();
const {user_mode, user_model}=require("../models/user_model");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
user.use(express.json());

user.get("/",(req,res)=>{
     res.send("hello");
})

user.post("/login",async (req,res)=>{
   let {email,password}=req.body;
   let data = await user_model.find({email:email});
   if (data.length!=0){
     let pass= data[0].password;
     let user_id=data[0]._id;
     bcrypt.compare(password,pass,(err,result)=>{
          if(!result){
               res.json("Wrong Password");
          }
          else {
               let token = jwt.sign({user_id:user_id},process.env.key,{expiresIn:"5h"});
               res.json({msg:"Logged in succesfully",token:token});
          }
     })
   }
   else {
       res.json("Sign up first")
   }
})

user.post("/signup",async (req,res)=>{
     let {firstname,lastname,email,password}=req.body;
    let data = await user_model.find({email:email});
    if (data.length==0){
     bcrypt.hash(password,5,async (err,hash)=>{
          if(err){
               res.json("Problem in encrypting password");
          }
          else {
               await user_model.insertMany([{firstname,lastname,email,password:hash}]);
               res.json("User Added");
          }
          
     })
    }
    else {
      res.json("Email already Signed up")
    }
     
})


module.exports={user};