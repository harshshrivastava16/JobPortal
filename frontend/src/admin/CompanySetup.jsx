import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div className="bg-black">
            <Navbar/>
        <div className="max-w-md mx-auto my-5 p-5 bg-gray-800 rounded-lg shadow-lg text-gray-200">
    <form onSubmit={submitHandler}>
        <div className="flex items-center gap-2 pb-5 border-b border-gray-700">
            <button
                type="button"
                onClick={() => navigate("/admin/companies")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded hover:bg-gray-600"
            >
                <span>&larr; Back</span>
            </button>
            <h1 className="text-2xl font-bold text-red-500">Company Setup</h1>
        </div>
        <div className="grid gap-4 mt-5">
            <div>
                <label className="block text-sm font-medium">Company Name</label>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Website</label>
                <input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-200"
                />
            </div>
        </div>
        <button
            type="submit"
            disabled={loading}
            className={`mt-5 w-full p-3 rounded-md text-white ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'}`}
        >
            {loading ? 'Please wait...' : 'Update'}
        </button>
    </form>
</div>
<Footer/>
</div>

    );
};

export default CompanySetup;
