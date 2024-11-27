import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User2, LogOut } from 'lucide-react';
import axios from 'axios'; // Import axios
import { USER_API_END_POINT } from '@/utils/constant.js';
import { setUser } from '@/redux/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      
      // Validate the response data before accessing properties
      if (res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-black shadow-lg'>
      <div className="flex items-center justify-between max-w-6xl mx-auto h-16 px-4">
        <div className='flex items-center'>
          <Link to='/'>
            <h1 className='text-2xl font-bold cursor-pointer text-white'>Job
              <span className='text-[#F83002]'>Portal</span>
            </h1>
          </Link>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-6 text-white'>
            {
              user && user.role === 'recruiter' ?(
                <>
                <li><Link to='/admin/companies'>Companies</Link></li>
                <li><Link to='/admin/jobs'>Jobs</Link></li>

                </>
              ):(
                <>
                <li><Link to='/' className="hover:text-[#F83002]">Home</Link></li>
                <li><Link to='/jobs' className="hover:text-[#F83002]">Jobs</Link></li>
                <li><Link to='/browse' className="hover:text-[#F83002]">Browse</Link></li>
                </>
              

              )
            }
            </ul>
           
          {
            !user ? (
              <div className='flex gap-4'>
                <Link to='/login'>
                  <button className='bg-[#F83002] text-white rounded-full px-4 py-1 font-bold hover:bg-[#c72b00]'>Login</button>
                </Link>
                <Link to='/signup'>
                  <button className='bg-white text-black rounded-full px-4 py-1 font-bold hover:bg-gray-200'>Signup</button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <div onClick={toggleDropdown} className="cursor-pointer">
                  <img
                    src={user?.profile?.profilePhoto}                   
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>

                {isOpen && (
                  <div className={`absolute right-0 mt-2 w-64 bg-[#1f2937] rounded-lg shadow-lg p-4 z-50 transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95 opacity-0'}`}>
                    <div className="flex items-center gap-4">
                      <img
                        src={user?.profile?.profilePhoto} 
                        alt="Profile"
                        className="w-[50px] h-[50px] rounded-full object-cover border border-gray-600 shadow-sm"
                      />
                      <div>
                        <h3 className="font-bold text-white text-lg">{user?.fullname}</h3>
                        <p className="text-sm text-gray-400">{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      {
                        user && user.role === 'student' &&(<Link to="/profile" className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
                          <User2 className="text-gray-400" />
                          <span>View Profile</span>
                        </Link>)
                      }
                      
                      <div 
                        className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                        onClick={logoutHandler}
                      >
                        <LogOut className="text-gray-400" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-800"></div>
    </div>
  );
};

export default Navbar;
