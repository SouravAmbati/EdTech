import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const apiUrl=import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/user/login`,{
              email,
              password 
            });
            console.log(response.data);
            
            if (response.data.success){
              toast.success("LogIn Successful");
              navigate("/");
            } 
            else {
              toast.error('No such Username found.')
            }
          } catch (error) {
            console.error(error);
            toast.error("Error: " + err.response.data.message);
            setTimeout(() => {}, 1000);
          }  
    console.log(e.target.value);
    
    
    }

    return (
        <>

            <div >
                <form action="" className='flex flex-col md:flex-row h-screen ' onSubmit={handleSubmit}>
                    <div className="w-full md:w-1/2 bg-teal-500 text-white flex flex-col justify-center items-center p-10 rounded-b-2xl md:rounded-b-none md:rounded-l-2xl shadow-lg">
                        <div className="text-3xl font-bold mb-4 text-center">Welcome Back!</div>
                        <p className="mb-6 text-center px-4">
                            To keep connected with us please sign in with your personal info
                        </p>
                        <Link to='/register'  type ='submit' className="border-2 border-white py-2 px-6 rounded-full hover:bg-white hover:text-teal-500 transition">
                            Sign Up
                        </Link >
                    </div>

                    {/* Right Side - Sign Up */}
                    <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10 rounded-t-2xl md:rounded-t-none md:rounded-r-2xl shadow-lg">
                        <div className="text-3xl font-bold text-teal-500 mb-6 text-center">Login</div>

                        {/* Social Icons */}


                        <p className="text-gray-400 text-sm mb-6 text-center">or use your email for registration:</p>

                        {/* Input Fields */}

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className="mb-4 w-72 max-w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            className="mb-6 w-72 max-w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <button type='submit' className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition">
                            SIGN IN
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}




export default Login