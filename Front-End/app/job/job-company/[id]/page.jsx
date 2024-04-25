// Import Layout component
'use client';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import React, { useState, useEffect, Suspense } from 'react';
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import Cookies from 'js-cookie';
import Loading from '../../../components/loading';

export default function JobApplicants({ params }) {
  const DOMAIN_NAME = '//localhost:7049/api';
  const authToken = Cookies.get('authToken');
  const [data, setData] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [fristTime, setFristTime] = useState(true);
  const [numberOfApplications, setNumberOfApplications] = useState('');
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/JobApplication/Applications/` + params.id,
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

      // // Process each application and extract jobId and userId
      // result.forEach((application) => {
      //   const { jobId, userId } = application;
      //   // Call handleApprove function with jobId, userId, and onActionSuccess
      //   handleApprove(jobId, userId);
      //   // Call handleReject function with jobId, userId, and onActionSuccess
      //   handleReject(jobId, userId);
      // });

      // Set the fetched data to the state
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (fristTime) {
      setFristTime(false);
      fetchData();
    }
  }, []);
  useEffect(() => {
    // Filter data based on isApproved property
    const all = data;
    const approved = data.filter((application) => application.isApproved);

    // Update state with filtered data
    setAllApplications(all);
    setApprovedApplications(approved);
  }, [data]);
  const handleSubmit = async () => {
    try {
      // Convert numberOfApplications to integer
      const count = parseInt(numberOfApplications);
      
      // Make sure count is a valid number
      if (isNaN(count) || count <= 0) {
        alert('Please enter a valid positive number.');
        return;
      }
      
      // Filter applications based on cvScore and select the top ones to approve
      const applicationsToApprove = allApplications
        .sort((a, b) => b.CVcvScore - a.CVcvScore) // Sort applications by cvScore in descending order
        .slice(0, count); // Select the top 'count' applications
      
      // Approve the selected applications
      for (const application of applicationsToApprove) {
        try {
          await handleApprove(application.jobId, application.userId);
        } catch (error) {
          // Handle error (optional)
          console.error('Error approving job application:', error);
          alert('Failed to approve some job applications. Please try again later.');
        }
      }
      
      // If all applications are approved successfully, fetch data
      fetchData();
      
      // Handle success response
      alert(`${count} application(s) approved successfully based on cvScore.`);
    } catch (error) {
      console.error('Error approving job applications:', error);
      alert('Failed to approve job application(s). Please try again later.');
    }
  };
  const handleApprove = async (jobId, userId) => {
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/JobApplication/approve/job/${jobId}/user/${userId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to approve job application');
      }
      fetchData();

      setLoading(false);
      // Handle success response
    } catch (error) {
      console.error('Error approving job application:', error);
    }
  };

  const handleReject = async (jobId, userId) => {
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/JobApplication/reject/job/${jobId}/user/${userId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reject job application');
      }
      fetchData();

      setLoading(false);
      // Handle success response
    } catch (error) {
      console.error('Error rejecting job application:', error);
    }
  };
  // const interviewData = {
  //   "interviewDate": "2024-04-21T02:43:08.202Z",
  //   "interviewLink": "string"
  // };
  const sendInterviewEmail = async (jobId, interviewData) => {
    try {
      const response = await fetch(`https://${DOMAIN_NAME}/JobApplication/interview/job/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, 
        },
        body: JSON.stringify(interviewData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send interview emails');
      }
  
      const data = await response.json();
      alert(`${data.count} Email(s) sent successfully.`);
      console.log('Interview emails sent successfully:', data);
    } catch (error) {
      console.error('Error sending interview emails:', error);
    }
  };
  const handleSendInterviewEmail = () => {
    if (data && data[0] && data[0].jobId) {
      const interviewData = {
        interviewDate: '2024-04-25', // Replace with the actual interview date
        interviewLink: 'https://example.com/interview', // Replace with the actual interview link
      };
      sendInterviewEmail(data[0].jobId, interviewData);
    } else {
      console.error('Job ID is not available');
    }
  };

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }


  return (
    <Layout>
      <>
        {/* <div id="overlayer" />
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}
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
                    <form>
                      <div className="row mb-5 -flex align-items-end justify-content-center">
                        <div className="form-group col-md-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter number of applications"
                            value={numberOfApplications}
                            onChange={(e) => setNumberOfApplications(e.target.value)}
                          />
                        </div>
                        <div className="form-group col-md-3 ">
                          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Approve Applications
                          </button>
                        </div>
                      </div>
                      <div className="form-group col-md ">
                          <button type="button" className="btn btn-primary" onClick={handleSendInterviewEmail}>
                            Send Interview Emails
                          </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Link href="#next" className="scroll-button smoothscroll">
              <span className=" icon-keyboard_arrow_down" />
            </Link>
          </section>
          <section className="site-section p-2" id="next">
            <Tabs aria-label="Tabs with icons"className="p-0 m-0" style="underline">
              <Tabs.Item className="p-0 m-0" title="All applicants" icon={HiUserCircle}>
                <div className="p-0 m-0">
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
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allApplications.map((applicant, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link href={`/job/job-company/${applicant.jobId}/job-application/${applicant.userId}`} target="_blank">
                              <img
                                className="w-10 h-10 rounded-full"
                                src="/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                alt="image"
                              />
                              <div className="ps-3">
                                <div className="text-base font-semibold">
                                  {applicant.fullName}
                                </div>
                                <div className="font-normal text-gray-500">
                                  {applicant.email}
                                </div>
                              </div>
                              </Link>
                            </th>
                            <td className="px-6 py-4">{applicant.position}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{' '}
                                {applicant.location}
                              </div>
                            </td>
                            <td className="px-6 py-4">{applicant.cvScore}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleApprove(
                                    applicant.jobId,
                                    applicant.userId
                                  )
                                }
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
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
                      <span id="paginationInfo">
                        Showing {allApplications.length} Applicants
                      </span>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Approved applicants" icon={MdDashboard}>
                <div className="">
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
                          <th scope="col" className="flex items-center justify-center px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedApplications.map((applicant, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link href={`/job/job-company/${applicant.jobId}/job-application/${applicant.userId}`} target="_blank">
                              <img
                                className="w-10 h-10 rounded-full"
                                src="/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                alt="image"
                              />
                              <div className="ps-3">
                                <div className="text-base font-semibold">
                                  {applicant.fullName}
                                </div>
                                <div className="font-normal text-gray-500">
                                  {applicant.email}
                                </div>
                              </div>
                              </Link>
                            </th>
                            <td className="px-6 py-4">{applicant.position}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{' '}
                                {applicant.location}
                              </div>
                            </td>
                            <td className="px-6 py-4">{applicant.cvScore}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleReject(
                                    applicant.jobId,
                                    applicant.userId
                                  )
                                }
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              >
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
                      <span id="paginationInfo">
                        Showing {approvedApplications.length} Applicants
                      </span>
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
                  <Link
                    href="/login"
                    className="btn btn-warning btn-block btn-lg"
                  >
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
