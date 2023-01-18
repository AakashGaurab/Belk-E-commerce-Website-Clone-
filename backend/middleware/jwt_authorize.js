const jwt = require("jsonwebtoken");
require("dotenv").config();



let authorize=(req,res,next)=>{
   let token = req.headers.token;
   try {
    let decoded = jwt.verify(token,process.env.key);
    req.body.user_id=decoded.user_id;
    next();
   } catch (error) {
    res.json("Bad token")
   }
}

module.exports={authorize};