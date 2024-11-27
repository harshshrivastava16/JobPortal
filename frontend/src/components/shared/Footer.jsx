import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="h-[1px] mt-10 min-w-max bg-black"></div>
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-8 md:mb-0">
              <h1 className='text-4xl font-bold text-white'>Job<span className='text-[#F83002]'>Portal</span></h1>
              <p className='mt-4 text-lg font-semibold text-red-600'>Connect with us:</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <FaFacebookSquare className='h-8 hover:text-red-600 cursor-pointer' />
                <FaInstagram className='h-8 hover:text-red-600 cursor-pointer' />
                <FaTwitter className='h-8 hover:text-red-600 cursor-pointer' />
                <FaGithub className='h-8 hover:text-red-600 cursor-pointer' />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h2 className="text-xl text-red-600 font-bold mb-4">Help Center</h2>
                <ul className="space-y-2">
                  <li className="hover:text-red-600 cursor-pointer">Summons</li>
                  <li className="hover:text-red-600 cursor-pointer">Grievances</li>
                  <li className="hover:text-red-600 cursor-pointer">Report Issue</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl text-red-600 font-bold mb-4">About Us</h2>
                <ul className="space-y-2">
                  <li className="hover:text-red-600 cursor-pointer">Careers</li>
                  <li className="hover:text-red-600 cursor-pointer">Employer Home</li>
                  <li className="hover:text-red-600 cursor-pointer">Sitemap</li>
                  <li className="hover:text-red-600 cursor-pointer">Credits</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl text-red-600 font-bold mb-4">Legal</h2>
                <ul className="space-y-2">
                  <li className="hover:text-red-600 cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-red-600 cursor-pointer">Terms & Conditions</li>
                  <li className="hover:text-red-600 cursor-pointer">Fraud Alert</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="h-[1px] min-w-max bg-slate-600"></div>
      <div className="bg-black text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm font-semibold pl-3">Developed by Harsh</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-2 md:mt-0">
            <a href="https://www.linkedin.com/in/harsh-shrivastava-8479b7250/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className='h-8 hover:text-red-600 cursor-pointer' />
            </a>
            <a href="https://github.com/harshshrivastava16" target="_blank" rel="noopener noreferrer">
              <FaGithub className='h-8 hover:text-red-600 cursor-pointer' />
            </a>
          </div>
          <p className="text-sm font-semibold mt-2 pr-3 md:mt-0">© {new Date().getFullYear()} Harsh. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
