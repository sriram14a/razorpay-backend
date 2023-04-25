import Razorpay from "razorpay"
import crypto from "crypto"
import * as dotenv from "dotenv"
import express from "express"

dotenv.config();
const router = express.Router();

router.post("/orders", async (req, res) => {
    try{
const instance = new Razorpay({
    key_id:process.env.key_id,
    key_secret:process.env.secret_key,
});
const options = {
    amount:req.body.amount*100,
    currency:"INR",
    receipt:crypto.randomBytes(10).toString("hex")
}
instance.orders.create(options,function(error,order){
if(error){
    console.log(error);
    return res.status(500).json({message:"Somthing went wrong"})
}
res.status(200).json({data:order}); 
})
    }
    catch(err){
console.log(err);
res.status(500).json({message:"server error"})
    }
  });


  router.post("/verify", async (req, res) => {
    try{
const {orderid,paymentid,sign} = req.body
const signature = orderid+"|"+paymentid;
const signMatch = crypto
.createHmac("sha256",process.env.secret_key)
.update(signature.toString())
.digest("hex");

if(sign === signMatch){
    res.status(200).json({ message:"Payment verified"})
}else{
    res.status(400).json({ message:"invalid sign"})

}
}
    catch(err){
console.log(err);
res.status(500).json({message:"server error"})
    }
  });

  export const paymentRouter = router;