// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Brief = () => {
//   const [inBrief, setInBrief] = useState('');
//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch roadmap data from the backend
//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const response = await axios.post(`${apiUrl}/user/inBrief`, {
//           data: localStorage.getItem('projectTitle'),

//         }); // Update the endpoint if needed
//         console.log(response);
        
//         setProject(response.data.projects);
//         console.log(response);
//       } catch (error) {
//         toast.error("Failed to load roadmap");
//         console.error("Error fetching roadmap:", error);
//       }
//     };

//     fetchRoadmap();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#D9D9D9] p-4">
//       <div className=''>
//         <h1 className='text-xl lg:text-3xl text-center mb-4 font-bold'>In Brief About{localStorage.getItem('skills')}</h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
//         {project.map((item, index) => (
//           <div
//             key={index}
//             className="bg-[#E4E4E4] p-6 w-full aspect-square rounded-xl hover:shadow-md transition duration-200 flex flex-col justify-center items-center hover:scale-102"
//           >
//             <h2 className="text-xl lg:text-2xl font-medium mb-2">{item}</h2>
//             {/* <p className="text-md font-light text-gray-700 text-center">{item}</p> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Brief;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom'; // <-- to get title from route

// const Brief = () => {
//   const [description, setDescription] = useState('');
//   const { title } = useParams(); // <-- assuming /brief/:title route
//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchBrief = async () => {
//       try {
//         const response = await axios.post(`${apiUrl}/user/inBrief`, {
//           data: title || localStorage.getItem('projectTitle'),
//         });

//         console.log("Fetched Brief:", response.data);
//         setDescription(response.data.projects || "No description available.");
//       } catch (error) {
//         toast.error("Failed to load brief");
//         console.error("Error fetching brief:", error);
//       }
//     };

//     fetchBrief();
//   }, [title]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#e4e4e4] px-6 py-10">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
//           In Brief About <span className="text-[#00D1CD]">{title || localStorage.getItem('skills')}</span>
//         </h1>

//         <hr className="mb-6 border-gray-300" />

//         <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
//           {Array.isArray(description)
//             ? description.map((item, index) => (
//                 <p key={index} className="mb-4">{item}</p>
//               ))
//             : <p>{description}</p>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Brief;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Brief = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const projectTitle = localStorage.getItem('projectTitle');
    setTitle(projectTitle);

    const fetchBrief = async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/inBrief`, {
          data: projectTitle,
        });

        setDescription(response.data.projects || 'No description found');
      } catch (error) {
        toast.error('Failed to load project description');
        console.error(error);
      }
    };

    if (projectTitle) {
      fetchBrief();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          In Brief About <span className="text-[#00D1CD]">{title}</span>
        </h1>

        <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {Array.isArray(description)
            ? description.map((desc, idx) => <p key={idx} className="mb-4">{desc}</p>)
            : <p>{description}</p>}
        </div>
        <div className='mt-15'>
            <Link to='/project' className='text-2xl lg:text-3xl'> ⬅Back</Link>

        </div>
      </div>
    </div>
  );
};

export default Brief;
