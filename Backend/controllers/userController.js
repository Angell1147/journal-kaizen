import validator from "validator";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import axios from 'axios';

const createToken = (userId) => {
    const payload = { userId };
    const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Store in .env for security
    const options = { expiresIn: "1h" }; // Token expires in 1 hour

    return jwt.sign(payload, secretKey, options);
};

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Generate token
            const token = createToken(user._id);

            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred, please try again" });
    }
};


//Route for user registration
const registerUser = async (req,res) =>{
    console.log(req.headers);
    try{
        const {name,email,password} = req.body;

        //checking whether already exists or not
        const exists = await userModel.findOne({email});

        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        //Validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //Hashing a strong password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error){
        console.log(error);
        res.json({success:false,message:error.message})
    }

    
}

        

export {loginUser, registerUser}