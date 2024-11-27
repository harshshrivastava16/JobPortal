import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  return (
    <div className="relative w-full h-[470px] flex flex-col md:flex-row items-center justify-between bg-black px-8 py-12">
    {/* Image Section */}
    <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/2 flex justify-center items-center">
      <img 
        src="https://cdn.usegalileo.ai/sdxl10/40a034a1-a9d2-455c-bd1f-a52d37bc3e22.png" 
        alt="Job Search Illustration" 
        className="h-[300px] md:h-[400px] w-auto md:w-[450px] rounded-[10px] shadow-lg"
      />
    </div>
  
    {/* Text and Search Section */}
    <div className="text-center md:text-left md:w-1/2">
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
        Find your next job <br />
        faster with <br />
        Job<span className="text-[#F83002]">Portal</span>
      </h1>
      <p className="text-white text-sm sm:text-base md:text-lg mb-6">
        Explore thousands of jobs in demand with the <br />
        right skills, experience, and education.
      </p>
  
      <div className="flex items-center border rounded-full bg-gray-800 w-full max-w-[600px] mx-auto md:mx-0">
        <CiSearch className="text-gray-400 h-6 w-6 mx-3" />
        <input 
          type="text" 
          placeholder="Search or type keyword" 
          className="w-full bg-transparent text-white px-3 py-2 placeholder-gray-400 border-none outline-none rounded-l-full" 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button 
          onClick={searchJobHandler} 
          className="bg-[#F83002] text-white px-4 py-2 rounded-r-full hover:bg-[#d72b01] transition duration-300">
          Find Jobs
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default Hero;
