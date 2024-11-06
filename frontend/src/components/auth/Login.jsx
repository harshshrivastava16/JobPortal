import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { user, loading } = useSelector(store => store.auth);  // Get user from Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);  // Add user and navigate as dependencies

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="bg-[#111827] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Log In</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Log in as:
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="mr-2 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="student" className="mr-4 text-gray-300">
                  Student
                </label>
                <input
                  type="radio"
                  id="recruiter"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="mr-2 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="recruiter" className="text-gray-300">
                  Recruiter
                </label>
              </div>
            </div>

            {loading ? (
              <button className="w-full my-4 flex justify-center items-center bg-gray-600 text-white rounded-lg px-4 py-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </button>
            ) : (
              <button type="submit" className="w-full my-4 bg-red-600 text-white rounded-lg px-4 py-2">
                Login
              </button>
            )}

            <span className="text-sm text-gray-300 mt-5">
              Don't have an account?
              <Link to="/signup" className="text-blue-400 hover:underline ml-1">
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
