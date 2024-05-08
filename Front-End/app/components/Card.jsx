'use client';
import React from 'react';
import { Badge } from 'flowbite-react';
function CardComp({
  title,
  jobTime,
  company,
  location,
  timePosted,
  employmentType,
  categories,
  companyImageUrl,
  onClick,
  status,
}) {
  return (
    <div
      className="bg-white p-2 rounded-md shadow-lg max-w-[920px] mx-auto hover:bg-gray-100 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-30 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-roboto text-[#121212] text-lg font-semibold">
            {title}
          </h2>
          <p className="font-roboto text-[#121212]">
            {company}
            <span className="icon-room mr-1" />
            {location}
          </p>
          <p className="font-roboto text-[#6B7280] text-sm">{timePosted}</p>
        </div>
        {/* <div className="w-[50px] h-[50px]"> */}
        <img
          className="size-20 object-cover rounded-full border  d-inline-block mr-3 flex justify-center align-items-center"
          src={companyImageUrl}
          alt={`Company logo of ${company}`}
          width="50"
          height="50"
        />
        {/* </div> */}
      </div>
      <div className="font-roboto text-[#121212] space-x-2 flex">
        <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
          {employmentType}
        </span>
        <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
          {jobTime}
        </span>
        <div className="flex flex-wrap gap-2">
          <Badge
            color={
              status === 'Rejected'
                ? 'red'
                : status === 'Accpted'
                ? 'green'
                : status === 'Pending'
                ? 'warning'
                : null
            }
            size="sm"
          >
            {status}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {' '}
        <div className="flex flex-wrap gap-1">
          {' '}
          <div className="flex flex-wrap gap-1">
            {categories.map((category, index) => (
              <span key={index} className=" py-1 text-sm ">
                {category.trim()}
                {index < categories.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryComponent() {
  const jobInfo = {
    title: 'Payroll Specialist - Middle East',
    company: 'Remote Technology, Inc.',
    location: 'Cairo, Egypt',
    timePosted: '20 minutes ago',
    employmentType: 'Full Time',
    categories: [
      'Not specified',
      'Accounting/Finance',
      'Administration',
      'Human Resources Payroll',
      'Human Resources (HR)',
      'Personnel',
      'Accounting',
      'Microsoft Office',
      'Labor Law HR',
    ],
    companyImageUrl: './images/company-logo.png',
    onClick: () => (window.location.href = '/job-details'),
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <CardComp {...jobInfo} />
    </div>
  );
}

export default CardComp;
