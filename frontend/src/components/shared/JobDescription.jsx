import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Footer from './Footer';
import Navbar from './Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    
    const [isApplied, setIsApplied] = useState(false);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                
                // Update the applications list locally in the Redux store
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...(singleJob.applications || []), { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to apply for the job');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    
                    // Check if the user has already applied to the job
                    const alreadyApplied = res.data.job.applications?.some(application => application.applicant === user?._id) || false;
                    setIsApplied(alreadyApplied);
                }
            } catch (error) {
                console.log('Error fetching job details:', error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-black">
        <Navbar />
        <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-800 text-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="font-semibold text-3xl text-gray-100">{singleJob?.title}</h1>
              <div className="flex items-center gap-3 mt-4">
                <span className="px-3 py-1 bg-blue-700 bg-opacity-25 text-blue-400 font-medium text-sm rounded-full">
                  {singleJob?.position} Positions
                </span>
                <span className="px-3 py-1 bg-red-700 bg-opacity-25 text-red-400 font-medium text-sm rounded-full">
                  {singleJob?.jobType}
                </span>
                <span className="px-3 py-1 bg-purple-700 bg-opacity-25 text-purple-400 font-medium text-sm rounded-full">
                  {singleJob?.salary} LPA
                </span>
              </div>
            </div>
            <button
              onClick={!isApplied ? applyJobHandler : null}
              disabled={isApplied}
              className={`px-5 py-2 rounded-lg font-semibold transition duration-200 text-sm ${
                isApplied
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
            >
              {isApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
      
          <h2 className="border-b border-gray-600 font-semibold py-5 mt-8 text-lg text-gray-100">
            Job Description
          </h2>
      
          <div className="my-6 space-y-4 text-gray-300">
            <p>
              <strong className="text-gray-400">Role:</strong>
              <span className="pl-4">{singleJob?.title}</span>
            </p>
            <p>
              <strong className="text-gray-400">Location:</strong>
              <span className="pl-4">{singleJob?.location}</span>
            </p>
            <p>
              <strong className="text-gray-400">Description:</strong>
              <span className="pl-4">{singleJob?.description}</span>
            </p>
            <p>
              <strong className="text-gray-400">Experience:</strong>
              <span className="pl-4">{singleJob?.experience} yrs</span>
            </p>
            <p>
              <strong className="text-gray-400">Salary:</strong>
              <span className="pl-4">{singleJob?.salary} LPA</span>
            </p>
            <p>
              <strong className="text-gray-400">Total Applicants:</strong>
              <span className="pl-4">{singleJob?.applications?.length || 0}</span>
            </p>
            <p>
              <strong className="text-gray-400">Posted Date:</strong>
              <span className="pl-4">{singleJob?.createdAt?.split("T")[0]}</span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
      
    );
};

export default JobDescription;
