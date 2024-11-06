import React from 'react';
import { useSelector } from 'react-redux';

const companies = [
    { name: 'Microsoft', minPackage: 15 },
    { name: 'Capgemini', minPackage: 15 },
    { name: 'TCS', minPackage: 8 },
    { name: 'Wipro', minPackage: 7 },
    { name: 'Infosys', minPackage: 7.5 },
    { name: 'Google', minPackage: 18 },
    { name: 'Amazon', minPackage: 16 },
    { name: 'Facebook', minPackage: 20 },
    { name: 'Accenture', minPackage: 10 },
    { name: 'IBM', minPackage: 9 },
];

const cities = [
    'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi', 'Chennai', 
    'Kolkata', 'Jaipur', 'Ahmedabad', 'Gurgaon', 'Noida', 'Lucknow'
];

const jobTitles = [
    'Software Developer', 'Data Scientist', 'Product Manager', 
    'Business Analyst', 'UX/UI Designer', 'Quality Assurance Engineer'
];

const jobDescriptions = [
    'Work on developing high-quality software solutions.', 
    'Analyze data to provide insights for decision-making.', 
    'Manage product lifecycle from ideation to launch.', 
    'Analyze business needs and create technical solutions.', 
    'Design user-friendly interfaces for web and mobile.', 
    'Ensure software quality through rigorous testing.'
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomJobs(numJobs) {
    let jobs = [];
    for (let i = 0; i < numJobs; i++) {
        const company = getRandomItem(companies);
        const city = getRandomItem(cities);
        const title = getRandomItem(jobTitles);
        const description = getRandomItem(jobDescriptions);
        const positions = Math.floor(Math.random() * 10) + 1;
        const packageLPA = company.minPackage + Math.floor(Math.random() * 5);
        const jobType = Math.random() > 0.5 ? 'Full-Time' : 'Intern';

        jobs.push({
            company: company.name,
            city,
            title,
            description,
            positions,
            packageLPA,
            jobType,
        });
    }
    return jobs;
}

const JobCards = () => {
    const jobs = generateRandomJobs(9);

    return (
        <div className="bg-black p-8">
            <h1 className='text-white text-4xl font-semibold mb-6'>Recently Posted Jobs</h1>
            <div className="grid grid-cols-1 rounded-[10px] sm:grid-cols-2 md:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-[#111827] p-6 rounded-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className='text-xl font-semibold text-white mb-2'>{job.company}</h2>
                        <p className='text-gray-400 mb-1'>{job.city}, India</p>
                        <p className='text-lg font-semibold text-white mb-2'>{job.title}</p>
                        <p className='text-gray-300 mb-4'>{job.description}</p>
                        <div className="flex flex-col sm:flex-row justify-between items-start">
                            <p className='text-gray-300'>Positions: <span className='font-semibold'>{job.positions}</span></p>
                            <p className='text-gray-300'>Package: <span className='font-semibold'>{job.packageLPA} LPA</span></p>
                            <p className={`text-sm font-medium ${job.jobType === 'Full-Time' ? 'text-green-400' : 'text-yellow-400'}`}>{job.jobType}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobCards;
