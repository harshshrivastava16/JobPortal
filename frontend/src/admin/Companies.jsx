import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/shared/Navbar';
import CompaniesTable from './CompaniesTable';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '@/redux/companySlice';
import Footer from '@/components/shared/Footer';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto my-5 px-4">
          <div className="flex justify-between mb-5">
            <input
              type="text"
              className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="ml-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-600 transition-colors"
              onClick={() => navigate('/admin/companies/create')}
            >
              New Company
            </button>
          </div>
          <CompaniesTable />
        </div>
        <Footer />
      </div>
      
    );
};

export default Companies;
