import React, { useEffect, useState } from 'react';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-black'>
            <Navbar/>
           
            <div className="max-w-7xl mx-auto pt-5 p-4 bg-black">
    <div className="flex gap-6">
        {/* Sidebar filter section */}
        <div className="w-1/5 bg-gray-900 rounded-lg p-4">
            <FilterCard />
        </div>

        {/* Job listings section with hidden scrollbar */}
        <div className="flex-1 h-[150vh] overflow-y-scroll hide-scrollbar">
            {filterJobs.length <= 0 ? (
                <span className="text-center text-white text-xl">Job not found</span>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterJobs.map((job) => (
                        <div key={job?._id} className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <Job job={job} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
</div>

            <Footer/>
        </div>
    );
};

export default Jobs;
