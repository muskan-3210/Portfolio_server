require('dotenv').config()
const express = require('express');
const { default: mongoose } = require('mongoose');
const index = express()
const cors = require('cors')
const router = require('./Routes/router')
const uri = process.env.Mongo_Url;

mongoose.set('strictQuery', true);
mongoose.set('strictQuery', false);

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('yes');
}).catch((err)=>{
    console.log('no');
});

index.use(cors());
index.use(express.json());
index.use(router);

index.listen(3002,()=>{
    console.log('run')
})