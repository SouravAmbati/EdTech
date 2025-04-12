// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   skills: { type: Array },
//   roadmap: { type: String },
// });

// const userModel = mongoose.models.user || mongoose.model("users", userSchema);

// export default userModel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: Array },
  roadmap: { type: Array},
  projects:{type:Array}
 
});

const userModel = mongoose.models.user || mongoose.model("users", userSchema);

export default userModel;
