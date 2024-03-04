'use client';
import React from 'react';

function MainComponent({
  title,
  company,
  companyLogo,
  location,
  timePosted,
  employmentType,
  workType,
  experienceLevel,
  categories,
  linkToDetailsPage,
}) {
  const categoriesList = categories.map((category, index) => (
    <span
      key={index}
      className="inline after:content-['·'] last:after:content-['']"
    >
      {category}
    </span>
  ));

  return (
    <a
      href={linkToDetailsPage}
      className="bg-white p-4 rounded-lg shadow-lg max-w-[920px] mx-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-roboto text-[#121212] text-lg font-semibold">
            {title}
          </h2>
          <p className="font-roboto text-[#121212]">
            {company} - {location}
          </p>
          <p className="font-roboto text-[#6B7280] text-sm">{timePosted}</p>
          <div className="flex gap-2 my-2">
            <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
              {employmentType}
            </span>
            {workType && (
              <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
                {workType}
              </span>
            )}
          </div>
          {experienceLevel && (
            <p className="font-roboto text-[#6B7280] text-sm">
              {experienceLevel}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <img
            src={companyLogo}
            alt={`Logo of ${company}`}
            className="w-16 h-16 rounded-full"
          />
        </div>
      </div>
      <div className="font-roboto text-[#6B7280] text-sm flex flex-wrap gap-1">
        {categoriesList}
      </div>
    </a>
  );
}

function StoryComponent() {
  const jobDetails = [
    {
      title: 'Payroll Specialist - Middle East',
      company: 'Remote Technology, Inc.',
      companyLogo: './images/remote-tech-logo.png',
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
      linkToDetailsPage: '/details/payroll-specialist-middle-east',
    },
    {
      title: 'Administrative Specialist',
      company: 'REMAX/KAYAN',
      companyLogo: './images/remax-kayan-logo.png',
      location: 'New Cairo, Cairo, Egypt',
      timePosted: '17 hours ago',
      employmentType: 'Full Time',
      workType: 'On-site',
      experienceLevel: 'Entry Level - 1 - 3 Yrs of Exp',
      categories: [
        'Accounting/Finance',
        'Administration',
        'English',
        'Accounting',
        'Business Administration',
        'New Cairo',
        'Microsoft Office',
        'Real Estate',
        'Brokerage',
      ],
      linkToDetailsPage: '/details/administrative-specialist',
    },
  ];

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center space-y-4">
      {jobDetails.map((jobInfo, index) => (
        <MainComponent key={index} {...jobInfo} />
      ))}
    </div>
  );
}

export default MainComponent;
