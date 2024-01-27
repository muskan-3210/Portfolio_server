const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        validator(value){
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            } 
        }
    },
    Message:{
        type:String,
        required:true,
        trim:true
    }
})

userSchema.methods.Messagesave = async function(message){
    try{
        this.Messages = this.Messages.concat({message});
        await this.save();
        return message;
    }catch(error){
        console.log(error);
    }
}

const enroll = new mongoose.model("enroll",userSchema);
module.exports = enroll;