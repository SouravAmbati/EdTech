import express from 'express'
import { getRegisterSkills, Loginuser, RegisterSkills, Registeruser, SendAi } from '../controllers/User.js';


const userRouter=express.Router();

userRouter.post('/register',Registeruser);
userRouter.post('/login',Loginuser);
userRouter.post('/skills',RegisterSkills)
userRouter.post('/login',Loginuser);
userRouter.get('/skills',getRegisterSkills)
userRouter.post('/roadmap',SendAi)
export default userRouter