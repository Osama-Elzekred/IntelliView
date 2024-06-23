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
  EndDate,
  categories,
  companyImageUrl,
  onClick,
  onDelete,
  onEnd,
  status,
  IsCompany,
}) {
  const statusClassName =
    EndDate && new Date(EndDate) <= Date.now()
      ? 'text-red-500 rounded-full bg-red-100 px-2  text-sm font-semibold inline-block flex-end'
      : '';
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
        <img
          className="size-20 object-cover rounded-full border  d-inline-block mr-3 flex justify-center align-items-center"
          src={companyImageUrl}
          alt={`Company logo of ${company}`}
          width="50"
          height="50"
        />
      </div>
      {/* <div className={statusClassName}>{'Closed'}</div> */}
      <div className="font-roboto text-[#121212] space-x-2 flex justify-between">
        {/* <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
          {employmentType}
        </span>
        <span className="bg-[#E5E7EB] rounded px-2 py-1 text-sm">
          {jobTime}
        </span> */}
        <div className="flex">
          <div className="flex flex-wrap gap-2 px-2 py-1 text-sm">
            <Badge
              className="bg-[#E5E7EB] rounded font-normal"
              color={'bg-[#E5E7EB]'}
              size="sm"
            >
              {employmentType}
            </Badge>
            <Badge
              className="bg-[#E5E7EB] rounded font-normal"
              color={'bg-[#E5E7EB]'}
              size="sm"
            >
              {jobTime}
            </Badge>
            {EndDate && new Date(EndDate) <= Date.now() && (
              <Badge className={statusClassName} size="sm">
                {'Closed'}
              </Badge>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge
                color={
                  status === 'Rejected'
                    ? 'red'
                    : status === 'Accepted'
                    ? 'green'
                    : status === 'Pending'
                    ? 'warning'
                    : status === 'InterviewStage'
                    ? 'warning'
                    : null
                }
                size="sm"
              >
                {status}
              </Badge>
            </div>
          </div>
        </div>
        {IsCompany && (
          <div className="flex  flex-row-reverse px-4 ">
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
              integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />

            <div className="flex space-x-2">
              <button
                className="text-red-500 p-2 rounded-full hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button
                className="text-blue-500 p-2 rounded-full hover:bg-blue-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onEnd();
                }}
              >
                <i className="fas fa-ban"></i>
              </button>
            </div>
          </div>
        )}
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
      {/* {IsCompany && (
        <div className="flex space-x-2 mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete Job
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onEnd();
            }}
          >
            End Job
          </button>
        </div>
      )} */}
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
    onDelete: () => console.log('Delete job clicked'),
    onEnd: () => console.log('End job clicked'),
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <CardComp {...jobInfo} />
    </div>
  );
}

export default CardComp;
