import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Always ensure filterCompany is an array
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="mt-5">
    <table className="min-w-full border-collapse bg-gray-800 text-gray-200">
        <caption className="text-lg font-semibold mb-4">A list of your recently registered companies</caption>
        <thead>
            <tr className="border-b border-gray-700">
                <th className="p-4 text-left">Logo</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-right">Action</th>
            </tr>
        </thead>
        <tbody>
            {filterCompany.length > 0 ? (
                filterCompany.map((company) => (
                    <tr key={company._id} className="border-b border-gray-700">
                        <td className="p-4">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="w-10 h-10 rounded-full"
                            />
                        </td>
                        <td className="p-4">{company.name}</td>
                        <td className="p-4">{new Date(company.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-right">
                            <button
                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                className="text-blue-400 hover:text-blue-600"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="p-4 text-center">
                        No companies found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>


    
    );
};

export default CompaniesTable;
