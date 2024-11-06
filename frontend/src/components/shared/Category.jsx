import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const jobs = [
    { imageSrc: 'https://cdn.usegalileo.ai/sdxl10/8712772e-669c-4c84-9b38-a213ead4e6ca.png', jobTitle: 'Data Analyst', numberOfJobs: '2500+' },
    { imageSrc: 'https://cdn.usegalileo.ai/stability/ff82f1b5-c491-4596-8c52-e86ac8e278e2.png', jobTitle: 'Front End Developer', numberOfJobs: '1500+' },
    { imageSrc: 'https://cdn.usegalileo.ai/sdxl10/632da5dd-a8d6-4592-b1e3-d6f9bb3c949b.png', jobTitle: 'Social Media Manager', numberOfJobs: '1200+' },
    { imageSrc: 'https://cdn.usegalileo.ai/stability/90b24a62-4669-4d52-96c0-97bf07a04331.png', jobTitle: 'Mobile App Developer', numberOfJobs: '800+' },
    { imageSrc: 'https://cdn.usegalileo.ai/sdxl10/e3441779-7d90-41e4-ae95-91784d453b4d.png', jobTitle: 'Video Game Designer', numberOfJobs: '500+' },
    { imageSrc: 'https://cdn.usegalileo.ai/sdxl10/cecfe92e-c94d-4eda-bd2a-a1231ad1cd91.png', jobTitle: 'SEO Specialist', numberOfJobs: '300+' },
    { imageSrc: 'https://cdn.usegalileo.ai/stability/fe9321f2-4c20-45a7-a6c0-94a2b60ce3b4.png', jobTitle: 'E-commerce Manager', numberOfJobs: '200+' },
];

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-black pt-[60px] px-5 pl-10">
      <h1 className="text-white text-4xl font-bold mb-5">Popular Job Categories</h1>
      <div className="grid grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            onClick={() => searchJobHandler(job.jobTitle)}
            className="cursor-pointer hover:opacity-90 transition-opacity duration-200 p-4 bg-[#212121] rounded-lg text-center text-white"
          >
            <img src={job.imageSrc} alt={job.jobTitle} className="h-32 w-full object-cover rounded-md mb-3" />
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
            <p className="text-gray-400">{job.numberOfJobs} jobs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
