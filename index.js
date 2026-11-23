import dns from "node:dns";
import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import User from './model/userSchema.js'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config()
const app = express()
app.use(express.json())

const connectDB = async () => {
    try {
        // console.log("Mongo URL =====> ", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)    
        console.log("Db connected");
    } catch (error) {
        console.log(error);  
    }
}

app.get("/user",(req,res)=>{

    res.status(200).json({
        status :true,
        message : "user added"
    })
    
})

app.post("/user", async (req,res) => {
    try {
    const userData = req.body

    const user = new User( userData)
    if(user){
        await user.save()
    }
     res.status(200).json({
      status: "true",
      message: "user added successfully",
    });
        
    } catch (error) {
        res.status(404).json({
            status : false,
            message : error.message
        })
    }
})

app.listen(process.env.PORT ,()=>{
    console.log(`Server is listening from the port ${process.env.PORT}`);
    connectDB()
})
