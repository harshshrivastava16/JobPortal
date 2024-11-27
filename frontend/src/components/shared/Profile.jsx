import React, { useState } from 'react';
import Navbar from './Navbar';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { PencilIcon } from '@heroicons/react/24/outline';
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  
  const isResumeAvailable = user?.profile?.resume;

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      
      <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl my-8 p-8 shadow-lg px-6">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            
            <div className='h-24 w-24 rounded-full overflow-hidden border border-gray-700 shadow-lg'>
              <img 
                src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                alt="Profile"
                className='h-full w-full object-cover'
              />
            </div>
            {/* Profile Name and Bio */}
            <div>
              <h1 className='font-bold text-2xl text-red-600 mb-1'>{user?.fullname}</h1>
              <p className='text-gray-400 italic'>{user?.profile?.bio }</p>
            </div>
          </div>
          
          {/* Edit Profile Button */}
          <button 
    onClick={() => setOpen(true)} 
    className="p-2 border border-gray-500 text-white bg-red-500 hover:bg-red-600 transition duration-300 rounded-lg shadow-lg"
>
    <PencilIcon className="h-5 w-5" />
</button>
        </div>
        
        {/* Contact Info */}
        <div className='my-5'>
          <div className="flex items-center gap-3 mb-3">
            <span className='text-red-500'>📧</span>
            <span className='text-gray-300'>{user?.email }</span>
          </div>
          <div className="flex items-center gap-3">
            <span className='text-red-500'>📞</span>
            <span className='text-gray-300'>{user?.phoneNumber }</span>
          </div>
        </div>
        
        {/* Skills Section */}
        <div className='my-6'>
  <h2 className='text-xl font-semibold mb-2'>Skills</h2>
  <div className='flex flex-wrap'>
    {/* Check if skills exist */}
    {user?.profile?.skills?.length > 0 
      ? user.profile.skills.map((item, index) => (
          <span
            key={index}
            className="bg-red-500 text-white rounded-full px-4 py-1 m-1 text-sm shadow-lg transform hover:scale-105 transition-transform"
          >
            {item} {/* This prints each skill without quotes or brackets */}
          </span>
        ))
      : <span className='text-gray-400'>N/A</span>
    }
  </div>
</div>

        {/* Resume Section */}
        <div className='my-6'>
  <label className='text-lg font-semibold mb-2'>Resume : </label>

  {isResumeAvailable ? (
    <a 
      target='_blank' 
      rel='noopener noreferrer' 
      href={user?.profile?.resume} 
      className='text-blue-400 hover:underline transition duration-300'
    >
      {/* Extracting the filename from the URL */}
      {user?.profile?.resume
        ? user.profile.resume.substring(user.profile.resume.lastIndexOf("/") + 1) // Extract filename
        : 'View Resume'}
    </a>
  ) : (
    <span className='text-gray-400'>N/A</span>
  )}
</div>

      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl p-6 shadow-lg mt-10 mb-10 px-6">
        <h2 className='text-2xl font-semibold mb-4'>Applied Jobs</h2>
        <AppliedJobTable />
      </div>
      
      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Profile;
