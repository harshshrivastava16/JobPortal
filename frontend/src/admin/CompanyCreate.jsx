import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-black'>
            <Navbar/>
            <div className="max-w-md mx-auto p-6 mt-10 mb-10 bg-gray-800 rounded-lg shadow-md">
    <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Your Company Name</h1>
        <p className="text-gray-400">What would you like to name your company? You can change this later.</p>
    </div>

    <label className="block text-sm font-semibold text-gray-200 mb-2">Company Name</label>
    <input
        type="text"
        placeholder="JobHunt, Microsoft etc."
        onChange={(e) => setCompanyName(e.target.value)}
        className="p-2 w-full mb-4 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400"
    />
    
    <div className="flex gap-2">
        <button
            onClick={() => navigate("/admin/companies")}
            className="flex-1 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
            Cancel
        </button>
        <button
            onClick={registerNewCompany}
            className="flex-1 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
        >
            Continue
        </button>
    </div>
</div>
<Footer/>
        </div>
    );
};

export default CompanyCreate;
