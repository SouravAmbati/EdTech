import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Skills = () => {
    const [skill, setSkill] = useState('');
    const apiUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSkill(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/user/skills`, {
                userId: localStorage.getItem("Id"), skill
            });
            console.log(response.data);
            if (response.data.success) {
                toast.success("Skill Successfully added");
                const skillsArray = response.data.user.skills;
                const lastSkill = skillsArray[skillsArray.length - 1];
                localStorage.setItem('skills', lastSkill)
                navigate("/roadmap");
            }
            else {
                toast.error("Skill did'nt added")
            }
        } catch (error) {
            console.error(error);
            toast.error("Error: " + err.response.data.message);
            setTimeout(() => { }, 1000);
        }
        console.log('Submitted Skill:', skill);

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={skill}
                onChange={handleChange}
                placeholder="Full-Stack Development"
                className='border-1 p-3 rounded-md inline-block m-5'
            />
            <button type="submit" className='border-1 bg-green-200 rounded-md p-1'>Submit Skill</button>
        </form>
    );
};

export default Skills;
