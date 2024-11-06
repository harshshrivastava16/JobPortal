import React, { useState, useEffect } from "react";
import { USER_API_END_POINT } from '@/utils/constant';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Loader2 } from 'lucide-react'; // Import Loader2

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-[#111827] p-8 rounded-lg shadow-lg mt-[20px] mb-4 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="+91 123 456 7890"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Profile</label>
            <div className="flex items-center">
              <label className="w-full flex items-center justify-between px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 cursor-pointer hover:bg-gray-800">
                <span>{input.file ? input.file.name : 'No file chosen'}</span>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={changeFileHandler}
                  className="sr-only"
                />
                <span className="text-red-600">Choose File</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Sign up as:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="mr-2 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="student" className="mr-4 text-gray-300">Student</label>
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="mr-2 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="recruiter" className="text-gray-300">Recruiter</label>
            </div>
          </div>

          {
            loading ? (
              <button className="w-full my-4 flex justify-center items-center bg-gray-600 text-white rounded-lg px-4 py-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </button>
            ) : (
              <button type="submit" className="w-full my-4 bg-red-600 text-white rounded-lg px-4 py-2">
                Signup
              </button>
            )
          }

          <span className="text-sm text-white mt-5">
            Already have an account?
            <Link to='/login' className='text-blue-600'> Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
