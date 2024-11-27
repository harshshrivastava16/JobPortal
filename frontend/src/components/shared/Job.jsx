import React from 'react';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 overflow-hidden">
        {/* Top Section with Bookmark */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
          <button className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out">
            <Bookmark className="text-gray-600" />
          </button>
        </div>
      
        {/* Company Information */}
        <div className="flex items-center gap-4 my-4">
          <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden">
            <img 
              src={job?.company?.logo} 
              alt="Company Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>
      
        {/* Job Title and Description */}
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
      
        {/* Job Details Badges */}
        <div className="flex items-center gap-2 mt-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-sm rounded-full">
            {job?.position} Positions
          </span>
          <span className="px-3 py-1 bg-red-50 text-red-600 font-semibold text-sm rounded-full">
            {job?.jobType}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-700 font-semibold text-sm rounded-full">
            {job?.salary} LPA
          </span>
        </div>
      
        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button 
            onClick={() => navigate(`/description/${job?._id}`)} 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            Details
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">
            Save For Later
          </button>
        </div>
      </div>
      
    );
};

export default Job;
