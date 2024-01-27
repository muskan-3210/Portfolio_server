require("dotenv").config();
const express = require('express')
const router = new express.Router();
const users = require('../models/userSchema')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});


router.post('/register',async(req,res)=>{
        const{Name,Email,Message} = req.body
        if(!Name || !Email || !Message){
            res.status(401).json({status:401,error:'all fields are require'});
            console.log('already exists')
        }

        try {
            
            const preuser = await users.findOne({EMAIL:Email});
            if (preuser){
                const userMessage = await preuser.Messagesave(Message);
                console.log(userMessage);
                const mailOptions = {
                    from:process.env.EMAIL,
                    to:Email,
                    subject:"sending email",
                    text:"your response has been submitted"
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if (error) {
                        console.log('error'+ error);
                    } else {
                        console.log('Email sent' + info.response);
                        res.status(201).json({status:201,Message:'email sent succesfully'});
                    }
                });
            }else{
                const finalUser = new users({
                    Name,Email,Message
                });
                const storeData = await finalUser.save();
                const mailOptions = {
                    from:process.env.EMAIL,
                    to:Email,
                    subject:"sending email",
                    text:"your response has been submitted"
                }
                transporter.sendMail(mailOptions,(error,info)=>{
                    if (error) {
                        console.log('error'+ error);
                    } else {
                        console.log('Email sent' + info.response);
                        res.status(201).json({status:201,Message:'email sent succesfully'});
                    }
                });
                res.status(201).json({status:201,storeData});
            }
        } catch (error) {
            res.status(401).json({status:401,error:'all fields are required'});
            console.log('catch error')
        }

})


module.exports = router;