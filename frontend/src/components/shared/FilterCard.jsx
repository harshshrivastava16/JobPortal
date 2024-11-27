import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Experience",
    array: ["0-1 yr", "1-3 years", "3-5 years", "5+ years"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-[#111827] p-4 rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold text-white mb-4">Filter Jobs</h1>
  <hr className="my-2 border-gray-600" />
  {filterData.map((data, index) => (
    <div key={index} className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">{data.filterType}</h2>
      {data.array.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-3 mb-2">
          <input
            type="radio"
            id={`${data.filterType}-${item}`}
            name={data.filterType}
            value={item}
            checked={selectedValue === item}
            onChange={() => changeHandler(item)}
            className="text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <label htmlFor={`${data.filterType}-${item}`} className="text-gray-300 cursor-pointer text-sm sm:text-base">
            {item}
          </label>
        </div>
      ))}
    </div>
  ))}
</div>

  );
};

export default FilterCard;
