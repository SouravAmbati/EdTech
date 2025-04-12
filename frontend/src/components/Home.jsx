import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="h-screen w-full bg-gray-300 flex flex-col justify-center items-center">
      <h1 className="text-5xl md:text-6xl font-light text-black mb-8">
        NextGENAcademy
      </h1>
      <Link to='/register'  className="bg-white px-6 py-2 rounded shadow-md hover:bg-gray-100 transition">
        Get In
      </Link>
    </div>
    </>
  )
}

export default Home;