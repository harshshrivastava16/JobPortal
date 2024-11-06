import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div
    onClick={() => navigate(`/description/${job._id}`)}
    className="p-6 rounded-lg shadow-md bg-gray-800 border border-gray-700 cursor-pointer transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
>
    <div>
        <h1 className="font-semibold text-lg text-white">{job?.company?.name}</h1>
        <p className="text-sm text-gray-400">India</p>
    </div>

    <div className="my-4">
        <h1 className="font-bold text-xl text-white">{job?.title}</h1>
        <p className="text-sm text-gray-300 mt-1">{job?.description}</p>
    </div>

    <div className="flex items-center gap-2 mt-4">
        <span className="px-3 py-1 bg-blue-700 bg-opacity-20 text-blue-400 font-semibold rounded-full text-xs">
            {job?.position} Positions
        </span>
        <span className="px-3 py-1 bg-red-700 bg-opacity-20 text-red-400 font-semibold rounded-full text-xs">
            {job?.jobType}
        </span>
        <span className="px-3 py-1 bg-purple-700 bg-opacity-20 text-purple-400 font-semibold rounded-full text-xs">
            {job?.salary} LPA
        </span>
    </div>
</div>

    );
};

export default LatestJobCards;
