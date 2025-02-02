import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import Joi from "joi"

//app config
const app = express()
const port  =  process.env.port || 4000
connectDB()


//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log('Server started on port: '+port))