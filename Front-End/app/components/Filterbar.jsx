'use client'
import { useState } from 'react';

const Filterbar = ({ searchForm, handleChange, resetFilters }) => {
  return (
    <section className="py-1 flex">
      <div className="w-full">
        <div className="grid-cols-12 flex">
          <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
            <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
              <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                <p className="font-medium text-base leading-7 text-black">
                  Filter Plans
                </p>
                <p
                  className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-primary"
                  onClick={resetFilters}
                >
                  RESET
                </p>
              </div>
              <p className="font-medium text-sm leading-6 text-black mb-3">
                Job Type
              </p>
              <div className="box flex flex-col gap-2">
                {['on-site', 'remote', 'hybrid'].map((type, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`checkbox-jobType-${index}`}
                      type="checkbox"
                      checked={searchForm.jobType.includes(type)}
                      onChange={() => handleChange('jobType', type)}
                      className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                    />
                    <label
                      htmlFor={`checkbox-jobType-${index}`}
                      className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              <p className="font-medium text-sm leading-6 text-black mb-3 mt-3">
                Job Time
              </p>
              <div className="box flex flex-col gap-2">
                {['Part Time', 'Full Time', 'Contract', 'Internship', 'Temporary', 'Freelance'].map((time, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`checkbox-jobTime-${index}`}
                      type="checkbox"
                      checked={searchForm.jobTime.includes(time)}
                      onChange={() => handleChange('jobTime', time)}
                      className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                    />
                    <label
                      htmlFor={`checkbox-jobTime-${index}`}
                      className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
                    >
                      {time}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    </section>
  );
};

export default Filterbar;
