import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();

const app=express();


connectDB();
app.get('/api/myIntro',(req,res)=>{
    res.json({
        name:"Ankit Kumar",
        age:22,
        college:"PDCET",
        branch:"CSE"
    });
});

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})