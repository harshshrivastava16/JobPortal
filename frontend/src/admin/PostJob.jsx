import React, { useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === e.target.value);
        setInput({ ...input, companyId: selectedCompany ? selectedCompany._id : "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!input.title || !input.description || !input.requirements || !input.salary || !input.location || !input.jobType || !input.experience || input.position <= 0 || !input.companyId) {
            toast.error("Please fill in all fields correctly.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen text-gray-200">
    <Navbar />
    <div className="flex items-center justify-center w-screen my-5">
        <form 
            onSubmit={submitHandler} 
            className="p-8 max-w-4xl border border-gray-900 shadow-lg rounded-md bg-gray-900"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-300">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={input.description}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 resize-none overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Requirements</label>
                    <textarea
                        name="requirements"
                        value={input.requirements}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 resize-none overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        value={input.salary}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Job Type</label>
                    <input
                        type="text"
                        name="jobType"
                        value={input.jobType}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Experience Level</label>
                    <input
                        type="text"
                        name="experience"
                        value={input.experience}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">No of Positions</label>
                    <input
                        type="number"
                        name="position"
                        value={input.position}
                        onChange={changeEventHandler}
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Select a Company</label>
                    <select 
                        onChange={selectChangeHandler} 
                        className="border border-gray-600 rounded p-2 w-full bg-gray-700 text-gray-200 overflow-hidden"
                    >
                        <option value="">--Select a Company--</option>
                        {companies.map((company) => (
                            <option key={company._id} value={company.name.toLowerCase()}>{company.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {loading ? (
                <button 
                    type="button" 
                    className="w-full my-4 bg-gray-600 text-gray-400 rounded p-2 flex items-center justify-center"
                >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </button>
            ) : (
                <button 
                    type="submit" 
                    className="w-full my-4 bg-red-600 text-white rounded p-2 hover:bg-red-500"
                >
                    Post New Job
                </button>
            )}
            {companies.length === 0 && (
                <p className="text-xs text-red-500 font-bold text-center my-3">
                    *Please register a company first, before posting jobs
                </p>
            )}
        </form>
    </div>

    <Footer/>
</div>

    
    );
};

export default PostJob;
