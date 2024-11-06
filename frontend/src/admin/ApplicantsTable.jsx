import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accept", "Reject"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Error updating status. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Recent Applicants</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 bg-gray-900 text-gray-300">
                <caption className="text-left p-2 font-medium text-gray-400">A list of your recent applied users</caption>
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-2 border-b">Full Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Contact</th>
                        <th className="p-2 border-b">Resume</th>
                        <th className="p-2 border-b">Date</th>
                        <th className="p-2 border-b text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants?.applications?.length > 0 ? (
                        applicants.applications.map((item) => {
                            const { _id, applicant, createdAt, status } = item; // Assuming status is part of the item
                            const { fullname, email, phoneNumber, profile } = applicant || {};
                            const statusClass = status === 'accepted' ? 'bg-green-500' : status === 'rejected' ? 'bg-red-500' : 'bg-gray-500';
                            const statusText = status === 'accepted' ? 'Accept' : status === 'rejected' ? 'Rejected' : 'Pending';
    
                            return (
                                <tr key={_id} className="border-b hover:bg-gray-700 transition duration-150">
                                    <td className="p-2">{fullname || "N/A"}</td>
                                    <td className="p-2">{email || "N/A"}</td>
                                    <td className="p-2">{phoneNumber || "N/A"}</td>
                                    <td className="p-2">
                                        {profile?.resume ? (
                                            <a
                                                className="text-blue-400 underline hover:text-blue-600"
                                                href={profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {profile.resumeOriginalName || "Resume"}
                                            </a>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </td>
                                    <td className="p-2">{createdAt?.split("T")[0] || "N/A"}</td>
                                    <td className="p-2 text-right">
                                        <div className={`inline-flex items-center px-2 py-1 text-white rounded-full ${statusClass}`}>
                                            {statusText}
                                        </div>
                                        {shortlistingStatus.map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => statusHandler(status, _id)}
                                                className="text-gray-400 hover:text-gray-200 px-2 py-1 text-sm"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                No applicants found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    
    
    );
};

export default ApplicantsTable;
