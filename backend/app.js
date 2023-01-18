const express= require("express");
const { connect } = require("mongoose");
const app=express();
require("dotenv").config();
const {connnect}=require("./config/db");
const {user}=require("./routes/user_route");
const {product}=require("./routes/products_routes");
const {authorize}=require("./middleware/jwt_authorize")
app.use(express.json());


app.use("/user",user);
app.use("/product",authorize,product);


app.listen(process.env.port,async ()=>{
    try {
        await connect;
        console.log(`Server is running at http://localhost:${process.env.port}`)
    } catch (error) {
        console.log("Couldnot connect to mongoose")
    }
    
})