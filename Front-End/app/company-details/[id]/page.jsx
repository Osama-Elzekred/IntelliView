'use client';
import Layout from '../../components/Layout';
import React, { useState, useEffect, Suspense } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Loading, Breadcrumb } from '../../components/components';
import config from '../../../config';


function CompanyDetails({ params }) {
  // const DOMAIN_NAME = 'localhost:7049/api';
  const authToken = Cookies.get('authToken');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const { DOMAIN_NAME } = config;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/Job/CompanyDetails/` + params.id,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  // const data = {
  //   imageURl: '/images/company-profile-photo.jpg',
  //   companyName: 'Example Company',
  //   companyType: 'IT',
  //   companyOverview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum felis euismod nunc eleifend ultricies.',
  //   companyWebsite: 'www.example.com',
  //   phoneNumber: '123-456-7890',
  //   companySize: 'Large',
  //   companyFounded: '2000',
  // };

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

  return (
    <Layout>
      <>
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/edit-profile.css" />

        <div className="site-wrap">
          {/* Breadcrumb Navigation */}
          <Breadcrumb links={[{ name: 'Company Details', link: '/company-details' }]} />

          <div className="flex flex-col w-full items-center font-arial">
            <div className="w-full h-[200px] bg-[#0a2c5e] relative flex items-center justify-center">
              <img
                src="\Images\Intelliview2.png"
                alt="Intilliview logo"
                className="w-full h-full object-cover opacity-40"
              />
              <img
                src={data.imageURl}
                alt={`${data.companyName} logo`}
                className="w-[100px] h-[100px] rounded-full absolute left-[20px] bottom-[-50px]"
              />
            </div>
            <div className="w-full flex justify-center py-4">
              <div className="w-[600px] text-center sm:text-left">
                <div className="flex justify-center sm:justify-start">
                </div>
                <div className="sm:flex sm:items-center sm:justify-between">
                  <h1 className="text-2xl font-bold mb-2">
                    {data.companyName}
                  </h1>
                  <a href="#" className="text-blue-500 hidden sm:block">
                    <i className="fa fa-share-alt"></i> Share Company Page
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  {data.companyType} • {data.companySize} employees
                </p>
                <div className="flex space-x-4 mt-4 justify-center sm:justify-start">
                  <a href="#company-profile" className="px-4 py-2 bg-[#4bb6c9] text-white rounded-md">
                    Company Profile
                  </a>
                  <button className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded-md">
                    Jobs
                  </button>
                </div>
              </div>
            </div>
            <div id="company-profile" className="w-full flex justify-center py-4">
              <div className="w-[800px] flex flex-col sm:flex-row">
                <div className="w-full sm:w-[550px] p-4 border rounded-md mb-4 sm:mb-0">
                  <h2 className="text-lg font-bold mb-4">Company Profile</h2>
                  <p>
                    <span className="font-bold">Location:</span> Cairo, Egypt
                  </p>
                  <p>
                    <span className="font-bold">Type:</span> {data.companyType}
                  </p>
                  <p>
                    <span className="font-bold">Founded:</span> {data.companyFounded}
                  </p>
                  <p>
                    <span className="font-bold">Company Size:</span> {data.companySize} employees
                  </p>
                  <p className="mt-4">
                    {data.companyOverview}
                  </p>
                  <p className="mt-4">
                    <span className="font-bold">Website:</span>
                    <a href={data.companyWebsite} className="text-blue-500 ml-1">
                      {data.companyWebsite}
                    </a>
                  </p>
                </div>
                <div className="w-full sm:w-[200px] p-4 border rounded-md">
                  <h2 className="text-md font-bold mb-2">
                    Explore jobs tailored to you!
                  </h2>
                  <p className="text-sm mb-2">
                    Explore more jobs recommended for you and tailored to your career interests.
                  </p>
                  <Link href="/job"
                    className="text-blue-500">
                      Explore Jobs
                  </Link>
                  {/* <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
                    Explore Jobs
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};


export default CompanyDetails;
