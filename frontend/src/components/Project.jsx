import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Project = () => {
  const [project, setProject] = useState(['']);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch roadmap data from the backend
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/project`, {
          data: localStorage.getItem('skills'),
          userId: localStorage.getItem('id'),

        }); // Update the endpoint if needed
        console.log(response);
        
        setProject(response.data.projects);
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {project.map((item, index) => (
          <div
            key={index}
            onClick={() => localStorage.setItem('projectTitle', item)}
            className="bg-[#E4E4E4] p-6 w-full aspect-square rounded-xl hover:shadow-md transition duration-200 flex flex-col justify-center items-center hover:scale-102"
          >
            <h2 className="text-xl lg:text-2xl font-medium mb-2">{item}</h2>
            {/* <p className="text-md font-light text-gray-700 text-center">{item}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
