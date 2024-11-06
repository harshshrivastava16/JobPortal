import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [openDropdown, setOpenDropdown] = useState(null); // Manage dropdown state
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full bg-gray-900 border border-gray-800">
                <caption className="text-left font-semibold border-b text-red-700 border-gray-200 pb-2">
                    A list of your recently posted jobs
                </caption>
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-left font-medium text-white">Company Name</th>
                        <th className="py-3 px-4 text-left font-medium text-white">Role</th>
                        <th className="py-3 px-4 text-left font-medium text-white">Date</th>
                        <th className="py-3 px-4 text-right font-medium text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterJobs?.map((job) => (
                        <tr key={job._id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-gray-300">{job?.company?.name}</td>
                            <td className="py-2 px-4 text-gray-300">{job?.title}</td>
                            <td className="py-2 px-4 text-gray-300">{new Date(job?.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4 text-right relative">
                                <button 
                                    onClick={() => setOpenDropdown(openDropdown === job._id ? null : job._id)} 
                                    className="p-2 rounded-full hover:bg-gray-800"
                                >
                                    <MoreHorizontal className="w-4 h-4 text-gray-300" />
                                </button>
                                {openDropdown === job._id && (
                                    <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-600 rounded shadow-lg z-20">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-200" />
                                            <span className="text-white">Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700"
                                        >
                                            <Eye className="w-4 h-4 text-gray-200" />
                                            <span className="text-white">Applicants</span>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminJobsTable;
