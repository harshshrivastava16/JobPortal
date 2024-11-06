import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(state => state.job);

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-700 bg-gray-900 text-gray-300">
        <thead>
            <tr className="bg-gray-800">
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Job Role</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-right">Status</th>
            </tr>
        </thead>
        <tbody>
            {allAppliedJobs.length <= 0 ? (
                <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">You haven't applied to any jobs yet.</td>
                </tr>
            ) : (
                allAppliedJobs.map(appliedJob => (
                    <tr key={appliedJob._id} className="hover:bg-gray-700 transition duration-150">
                        <td className="px-6 py-4 border-b border-gray-600">{appliedJob?.createdAt?.split("T")[0]}</td>
                        <td className="px-6 py-4 border-b border-gray-600">{appliedJob.job?.title}</td>
                        <td className="px-6 py-4 border-b border-gray-600">{appliedJob.job?.company?.name}</td>
                        <td className="px-6 py-4 border-b border-gray-600 text-right">
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                    appliedJob?.status === 'rejected' ? 'bg-red-500 text-white' :
                                    appliedJob.status === 'pending' ? 'bg-gray-500 text-gray-200' :
                                    'bg-green-500 text-white'
                                }`}
                            >
                                {appliedJob.status.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>

  );
};

export default AppliedJobTable;