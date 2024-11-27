import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 bg-black text-white">
    <h1 className="text-4xl font-bold text-white">
        <span className="text-[#fc2a2a]">Latest & Top</span> Job Openings
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {
            allJobs.length <= 0 ? (
                <span className="text-lg text-gray-400">No jobs available at the moment. Please check back later.</span>
            ) : (
                allJobs.slice(0, 6).map(job => (
                    <div key={job._id} className="transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg">
                        <LatestJobCards job={job} />
                    </div>
                ))
            )
        }
    </div>
</div>

    );
};

export default LatestJobs;
