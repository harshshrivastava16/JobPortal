import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Hero from './shared/Hero';
import Category from './shared/Category';
import Footer from './shared/Footer';
import RecentlyPostedJobs from './shared/RecentlyPostedJobs';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LatestJobs from './shared/LatestJobs';


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="overflow-x-hidden overflow-y-hidden bg-black">
      <Navbar />
      <Hero />
      <Category />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
