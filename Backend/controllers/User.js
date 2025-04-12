import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { gemini, guide, roadmap } from "../services/gemini.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//REGISTER USER
const Registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User Already Exist" });
    }
    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a valid password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, _id: user._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//LOGINUSER
const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token, users: { _id: user._id } });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const RegisterSkills = async (req, res) => {
  try {
    //get data from body
    const { userId, skill } = req.body;
    const skills = await userModel.findOne({ skills: skill });
    //check if data is not provided
    if (!userId || !skill) {
      return res.json({
        success: false,
        message: "User ID or skill is missing",
      });
    }

    // Push skill to user's skills array
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { skills: skill } }, // Use $addToSet to avoid duplicates. Use $push to allow duplicates.
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Skill added",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const getRegisterSkills = async (req, res) => {
  try {
    const { userId } = req.body;
    const GetUserSkills = await userModel.findById(userId, {
      skills: 1,
      _id: 0,
    });
    if (!GetUserSkills) {
      return res.json({ message: "User Havent Added Any Skills Yet" });
    }
    return res.json(GetUserSkills);
  } catch (error) {}
};

const SendAi = async (req, res) => {
  try {
    const { content, userId } = req.body;
    if (!content) {
      return res.json({ message: "Content Is Not Added" });
    }
    const answer = await roadmap(content);
    if (!answer) {
      return res.json({
        success: false,
        message: "Due to Server Isuue Image Cant be generated",
      });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { roadmap: answer } },
      { new: true }
    );
    return res.json({ roadmap: answer, updatedUser });
  } catch (error) {
    console.log(error);
  }
};

const projectAi = async (req, res) => {
  try {
    //req project from the body
    const { data } = req.body;
    const { userId } = req.body;
    if (!data) {
      return res.json({ message: "Data is not sent" });
    }
    //send the data to Ai
    const answer = await gemini(data);
    if (!answer) {
      return res.json({
        success: false,
        message: "Due To Some Server Issue Projects Cant Be Loaded",
      });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { projects: answer } },
      { new: true }
    );
    // return res.json({updatedUser});
    return res.json({ projects: answer, updatedUser });
  } catch (error) {
    console.log(error);
  }
};

const GuideAi=async(req,res)=>{
  try {
    const {data}=req.body;
    if(!data){
      return res.json({message:"Data is not being Passed"})
    }
    const answer=await guide(data);
    // return res.json({answer});
    return res.json({ projects: answer});
  } catch (error) {
    console.log(error);
  }
}

// export { Registeruser, Loginuser, RegisterSkills, getRegisterSkills, SendAi  };
export {
  Registeruser,
  Loginuser,
  RegisterSkills,
  getRegisterSkills,
  SendAi,
  projectAi,
  GuideAi
};
