import express from "express"
import {loginUser,registerUser} from "../controllers/userController.js"

const userRouter = express.Router()
//login 
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

export default userRouter;