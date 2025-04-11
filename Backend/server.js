import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRouter from './Routes/user.js';
import connectDB from './CONFIG/mongo.js';

dotenv.config()
const app=express();
const port=process.env.PORT||4000
app.use(express.json());
app.use(cors());
connectDB();

app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.use('/api/user',userRouter)
app.listen(port,()=>{
    console.log(`server started on ${port}`);
    
})