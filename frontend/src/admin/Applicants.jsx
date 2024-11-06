import React, { useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import Footer from '@/components/shared/Footer';

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();

        return () => {
            // Cleanup or reset applicants if needed, for example:
            dispatch(setAllApplicants(null));
        };
    }, [id, dispatch]);

    return (
        <div  className='bg-black min-h-screen'>
            <Navbar />
            <div className="max-w-7xl h-60 mx-auto py-6">
    <h1 className="font-bold text-3xl text-gray-100 mb-4">
        Applicants: {applicants?.applications?.length || 0}
    </h1>
    {applicants?.applications?.length > 0 ? (
        <ApplicantsTable />
    ) : (
        <p className="text-gray-400 text-lg italic">No applicants found.</p>
    )}
</div>
<Footer/>


        </div>
    );
};

export default Applicants;
