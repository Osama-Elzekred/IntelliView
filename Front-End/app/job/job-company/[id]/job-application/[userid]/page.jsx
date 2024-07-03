// import { useNavigation } from 'next/navigation';
'use client';
import { Layout, Breadcrumb } from '../../../../../components/components';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Loading from '../../../../../components/loading';
import config from '../../../../../../config';

// /**
//  * Renders the details of a job application.
//  *
//  * @param {Object} params - The parameters for the job application.
//  * @param {string} params.id - The ID of the job.
//  * @param {string} params.userid - The ID of the user.
//  * @returns {JSX.Element} The JSX element representing the job application details.
//  */
export default function Job_Application_details({ params }) {
  const [applicantDetails, setApplicantDetails] = useState();
  const [loading, setLoading] = useState(true);
  // const applicantDetails = {
  //   id: parseInt(params.id), // Convert id to integer
  //   jobTitle: 'Product Designer',
  //   Name: 'Hassan Sani',
  //   ApplicantPhoto: '/images/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  //   location: 'New York City',
  //   email: 'example.gmail.com',
  //   cvUrl: '/path/to/cv',
  // };
  // const DOMAIN_NAME = 'localhost:7049/api';
  const { DOMAIN_NAME } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authToken');
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/JobApplication/Application/${params.id}/${params.userid}`,
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
        setApplicantDetails(result);
        //console.log(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [params.id, params.userid]);

  const ApplicantPhoto =
    '/images/default-avatar-profile-icon-of-social-media-user-vector.jpg';
  /* if (!applicantDetails) {
    return <div>Loading...</div>; // You can render a loading indicator while data is being fetched
  }*/

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }
  return (
    <Layout>
      <>
        {/* <div id="overlayer" /> */}
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
          <Breadcrumb
            links={[
              { name: 'Job Company', link: '/job/job-company' },
              {
                name: 'Job Application',
                link: `/job/job-company/${params.id}`,
              },
              { name: 'Applicant Details', link: '#' },
            ]}
          />
          <section className="">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="border p-2 d-inline-block mr-3 rounded">
                      <img src={ApplicantPhoto} alt="Applicant Photo" />
                    </div>

                    <div className="">
                      <h2>{applicantDetails?.fullName}</h2>
                      <div>
                        <span className="ml-0 mr-2 mb-2">
                          <span className="icon-briefcase mr-2" />
                          {applicantDetails?.gender}
                        </span>
                        <span className="m-2">
                          <span className="icon-room mr-2" />
                          {applicantDetails?.phone}
                        </span>
                        <span className="m-2">
                          <span className="icon-envelope mr-2" />
                          {applicantDetails?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {applicantDetails && (
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col-12">
                        <Link
                          href={applicantDetails.cvurl}
                          target="_blank"
                          className="btn btn-block btn-primary btn-md"
                        >
                          Preview CV
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full mx-auto p-5 bg-white rounded-lg m-5">
                  <div className="flex items-center justify-between">
                    <div className="w-2/3">
                      <h2 className="section-heading text-bold">
                        Questions and Answer
                      </h2>
                    </div>
                  </div>
                  <div className="mt-8 space-y-8">
                    <div>
                      {applicantDetails?.questionsAndAnswers?.map(
                        (item, index) => (
                          <div key={index}>
                            {/* Question */}
                            <div className="flex items-start mt-2">
                              <div>
                                <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
                                  Q
                                </span>
                              </div>
                              <p className="ml-4 md:ml-6 text-bold">
                                {item.question}
                              </p>
                            </div>
                            {/* Answer */}
                            <div className="flex items-start ">
                              <div>
                                <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                                  A
                                </span>
                              </div>
                              <p className="ml-4 md:ml-6 text-bold text-gray-800">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
}
