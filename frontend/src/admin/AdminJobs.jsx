import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import Footer from '@/components/shared/Footer';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className='bg-black'>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <input
            type="text"
            className="w-fit px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Jobs
          </button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminJobs;
