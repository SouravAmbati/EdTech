import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import axios from "axios";
const Register=()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/user/register`,{
              name,
              email,
              password,
            });
            console.log(response);
            if (response.data.message === "Already a user") {
              toast.error("Already a user. Please Login.");
            console.log('success');
            } else {
              toast.success("Signup Successful");
               localStorage.setItem('Id',response.data._id);
              navigate("/skills");
            }
          } catch (err) {
            console.log(err);
          }
    }
    return (

        <div >
            <form action="" onSubmit={(handleSubmit)} className="flex flex-col md:flex-row h-screen">
                {/* Left Side - Sign In */}
                <div className="w-full md:w-1/2 bg-teal-500 text-white flex flex-col justify-center items-center p-10 rounded-b-2xl md:rounded-b-none md:rounded-l-2xl shadow-lg">
                    <div className="text-3xl font-bold mb-4 text-center">Welcome Back!</div>
                    <p className="mb-6 text-center px-4">
                        To keep connected with us please login with your personal info
                    </p>
                    <Link  to ='/login' type='submit' className="border-2 border-white py-2 px-6 rounded-full hover:bg-white hover:text-teal-500 transition">
                        SIGN IN
                    </Link>
                </div>

                {/* Right Side - Sign Up */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 rounded-t-2xl md:rounded-t-none md:rounded-r-2xl shadow-lg">
                    <div className="text-3xl font-bold text-teal-500 mb-6 text-center">Create Account</div>

       
                  

                    <p className="text-gray-400 text-sm mb-6 text-center">or use your email for registration:</p>

                    {/* Input Fields */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="mb-4 w-72 max-w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="mb-4 w-72 max-w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                        className="mb-6 w-72 max-w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    <button type='submit' className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition">
                        SIGN UP
                    </button>
                </div>
            </form>
        </div>
    );
}


export default Register;