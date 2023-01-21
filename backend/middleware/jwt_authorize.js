const jwt = require("jsonwebtoken");
require("dotenv").config();



let authorize=(req,res,next)=>{
   if (req.method=="POST"){
      let token = req.headers.token;
      try {
    let decoded = jwt.verify(token,process.env.key);
    req.body.user_id=decoded.user_id;
    next();
   } catch (error) {
    res.json("Bad token")
   }
   }
   else {
      next();
   }
   
}

module.exports={authorize};