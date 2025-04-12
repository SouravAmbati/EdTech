import express from "express";
import {
  getRegisterSkills,
  GuideAi,
  Loginuser,
  projectAi,
  RegisterSkills,
  Registeruser,
  SendAi,
  
} from "../controllers/User.js";



const userRouter = express.Router();

userRouter.post("/register", Registeruser);
userRouter.post("/login", Loginuser);
userRouter.post("/skills", RegisterSkills);
userRouter.post("/login", Loginuser);
userRouter.get("/skills", getRegisterSkills);
userRouter.post("/roadmap", SendAi);
userRouter.post("/project",projectAi);
userRouter.post("/inBrief",GuideAi);

export default userRouter;

