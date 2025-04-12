import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState([]);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch roadmap data from the backend
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/roadmap`, {
          content: localStorage.getItem('skills'),
          userId: localStorage.getItem('id'),

        }); // Update the endpoint if needed
        setRoadmap(response.data.roadmap);
        console.log(response);
      } catch (error) {
        toast.error("Failed to load roadmap");
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="min-h-screen bg-[#D9D9D9] p-4">
      <div className=''>
        <h1 className='text-xl lg:text-3xl text-center mb-4 font-bold'>Roadmap for {localStorage.getItem('skills')}</h1>
        <Link to='/project'><p className='ml-[1400px] mb-2'>Next</p></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {roadmap.map((item, index) => (
          <div
            key={index}
            className="bg-[#E4E4E4] p-6 w-full aspect-square rounded-xl hover:shadow-md transition duration-200 flex flex-col justify-center items-center hover:scale-102"
          >
            <p className="text-md font-light text-gray-700 text-center">Step {index + 1}</p>
            <h2 className="text-xl lg:text-2xl font-medium mt-2">{item}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
