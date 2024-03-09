// Import Layout component
'use client';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import Cookies from 'js-cookie';


export default function JobApplicants() {
  const DOMAIN_NAME = '//localhost:7049/api';
  const [allApplicants, setAllApplicants] = useState([
    { name: "John Doe", email: "ABC Company",position:"react", location: "New York", status: "Pending" },
    { name: "Jane Smith", email: "XYZ Corporation", position:"react",location: "Los Angeles", status: "Approved" },
    { name: "Mike Johnson", email: "123 Industries", position:"react",location: "Chicago", status: "Rejected" }
  ]);
  const [approvedApplicants, setApprovedApplicants] = useState([
    { name: "Jane Smith", email: "ABC Company",position:"react", location: "Los Angeles", status: "Approved" },
    { name: "Sarah Williams", email: "ABC Company",position:"react", location: "San Francisco", status: "Approved" },
    { name: "Alex Brown", email: "ABC Company",position:"react", location: "Seattle", status: "Approved" }
  ]);

  const [rejectedApplicants, setRejectedApplicants] = useState([]);
  useEffect(() => {
    fetchApplicants('all');
    fetchApplicants('approved');
  }, []);

  const fetchApplicants = async (type) => {
    try {
      const authToken = Cookies.get('authToken');
      
      // Assuming you have an endpoint to fetch applicants data based on type
      const response = await fetch(`https://${DOMAIN_NAME}/applicants?type=${type}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} applicants data`);
      }
      const data = await response.json();
      if (type === 'all') {
        setAllApplicants(data);
      } else if (type === 'approved') {
        setApprovedApplicants(data);
      }
    } catch (error) {
      console.error(`Error fetching ${type} applicants:`, error);
    }
  };
  const handleApprove = async (applicantId) => {
    try {
      const authToken = Cookies.get('authToken');
      // Assuming you have an endpoint to update the approval status of an applicant
      const response = await fetch(`https://${DOMAIN_NAME}/applicants/${applicantId}/approve`, {
        method: 'PATCH', // Assuming PATCH method is used for updating the approval status
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include authorization token if required
        },
        // You can include any additional data needed to update the approval status in the request body
        body: JSON.stringify({ approved: true }), // Example: Send approved status as true
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve applicant');
      }
  
      // Handle success response from the backend
      console.log('Applicant approved successfully!');
      // Optionally, you can update the UI to reflect the approval status
    } catch (error) {
      console.error('Error approving applicant:', error);
      // Handle error scenario
    }
  };
  // Function to handle rejection
  const handleReject = async (applicantId) => {
    try {
      const authToken = Cookies.get('authToken');
      // Assuming you have an endpoint to update the approval status of an applicant
      const response = await fetch(`https://${DOMAIN_NAME}/applicants/${applicantId}/reject`, {
        method: 'PATCH', // Assuming PATCH method is used for updating the approval status
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include authorization token if required
        },
        // You can include any additional data needed to update the approval status in the request body
        body: JSON.stringify({ approved: false }), // Example: Send approved status as true
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve applicant');
      }
  
      // Handle success response from the backend
      console.log('Applicant approved successfully!');
      // Optionally, you can update the UI to reflect the approval status
    } catch (error) {
      console.error('Error approving applicant:', error);
      // Handle error scenario
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Filter applicants based on search query
    const filtered = allApplicants.filter(applicant =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplicants(filtered);
  };

  return (
    <Layout>
      <>
        <div id="overlayer" />
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body" />
          </div>{' '}
          {/* .site-mobile-menu */}
          {/* NAVBAR */}
          {/* HOME */}
          <section
            className="section-hero home-section overlay inner-page bg-image"
            style={{ backgroundImage: 'url("/images/background.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">
                      Job Applicants
                    </h1>
                    <p>Find applicants for job!</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="#next" className="scroll-button smoothscroll">
              <span className=" icon-keyboard_arrow_down" />
            </Link>
          </section>
          <section className="site-section p-2" id="next">
            <Tabs aria-label="Tabs with icons" style="underline">
              <Tabs.Item  title="All applicants" icon={HiUserCircle}>
              <div className="container">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {allApplicants.map((applicant, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <img className="w-10 h-10 rounded-full" src="/images/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="image" />
                          <div className="ps-3">
                            <div className="text-base font-semibold">{applicant.name}</div>
                            <div className="font-normal text-gray-500">{applicant.email}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{applicant.position}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> {applicant.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleApprove(applicant.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="row pagination-wrap">
                  <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                    <span id="paginationInfo">Showing {allApplicants.length} Applicants</span>
                  </div>
                </div>
              </div>
              </Tabs.Item>
              <Tabs.Item title="Approved applicants" icon={MdDashboard}>
              <div className="container">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Position
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          {approvedApplicants.map((applicant, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/images/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="image" />
                                <div className="ps-3">
                                  <div className="text-base font-semibold">{applicant.name}</div>
                                  <div className="font-normal text-gray-500">{applicant.email}</div>
                                </div>
                              </th>
                              <td className="px-6 py-4">{applicant.position}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> {applicant.location}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <button onClick={() => handleReject(applicant.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                <div className="row pagination-wrap">
                  <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                    <span id="paginationInfo">Showing {approvedApplicants.length} Applicants</span>
                  </div>
                </div>
              </div>
              </Tabs.Item>
            </Tabs>
          </section>
          <section
            className="py-5 bg-image overlay-primary fixed overlay"
            style={{ backgroundImage: 'url("/images/background.jpg")' }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="text-white">Looking For A Job?</h2>
                  <p className="mb-0 text-white lead"> Find your dream job.</p>
                </div>
                <div className="col-md-3 ml-auto">
                 <Link href="/login" className="btn btn-warning btn-block btn-lg">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
}
