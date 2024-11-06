import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  // Initialize input state with user data
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: null // Initialize as null
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    // Split skills by comma and trim whitespace
    const skillsArray = input.skills.split(",").map(skill => skill.trim());
    formData.append("skills", JSON.stringify(skillsArray)); 

    // Append file if it exists
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        timeout: 10000
      });

      if (res?.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to update profile.');
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out, please try again.');
      } else {
        toast.error('Something went wrong, please try again.');
      }
    } finally {
      setLoading(false); // Stop loading spinner
      setOpen(false);    // Close the dialog when finished
    }
  };

  return (
    <div>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='bg-[#111827] p-6 rounded-lg shadow-lg sm:max-w-[425px]'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold text-white'>Update Profile</h2>
              <button onClick={() => setOpen(false)} className='text-white text-lg hover:text-red-500'>
                &times;
              </button>
            </div>
            <form onSubmit={submitHandler}>
              <div className='grid gap-4'>
                <div className='flex items-center'>
                  <label htmlFor='fullname' className='text-right w-1/3 text-white'>Name</label>
                  <input
                    id='fullname'
                    value={input.fullname}
                    onChange={changeEventHandler}
                    name='fullname'
                    type='text'
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                    required // Add required attribute
                  />
                </div>
                <div className='flex items-center'>
                  <label htmlFor='email' className='text-right w-1/3 text-white'>Email</label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    onChange={changeEventHandler}
                    value={input.email}
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                    required // Add required attribute
                  />
                </div>
                <div className='flex items-center'>
                  <label htmlFor='phoneNumber' className='text-right w-1/3 text-white'>Number</label>
                  <input
                    id='phoneNumber'
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    name='phoneNumber'
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                    required // Add required attribute
                  />
                </div>
                <div className='flex items-center'>
                  <label htmlFor='bio' className='text-right w-1/3 text-white'>Bio</label>
                  <input
                    id='bio'
                    value={input.bio}
                    onChange={changeEventHandler}
                    name='bio'
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                  />
                </div>
                <div className='flex items-center'>
                  <label htmlFor='skills' className='text-right w-1/3 text-white'>Skills</label>
                  <input
                    id='skills'
                    value={input.skills}
                    onChange={changeEventHandler}
                    name='skills'
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                  />
                </div>
                <div className='flex items-center'>
                  <label htmlFor='file' className='text-right w-1/3 text-white'>File</label>
                  <input
                    id='file'
                    name='file'
                    type='file'
                    onChange={fileChangeHandler}
                    accept='application/pdf'
                    className='border rounded p-2 w-2/3 bg-gray-800 text-white'
                  />
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                {loading ? (
                  <button className='bg-gray-700 text-gray-300 py-2 px-4 rounded-lg flex items-center' disabled>
                    <ClipLoader size={20} color="#fff" />
                    <span className='ml-2'>Please wait...</span>
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none'
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileDialog;
