const express = require('express')
const router = express.Router()
const sendOtp = require('./twilio')

router.post('/send-otp',async(req,res)=>{
    let {phoneN}=req.body
    let otp=Math.floor(100000 + Math.random() * 900000)
    console.log(otp,'otpp');
    // let optE=new Date(Date.now()+1*60*1000)
    // console.log(optE,'expirer');
    try{
        await createMessage()
    }catch(err){
        console.log(err);
        
    }
    res.send("otp sent")
})

module.exports=router