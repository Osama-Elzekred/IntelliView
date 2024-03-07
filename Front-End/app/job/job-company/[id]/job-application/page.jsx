// import { useNavigation } from 'next/navigation';
'use client';
import Layout from '../../../../components/Layout';
import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/20/solid'

import React, { useState, useEffect } from 'react';
export default function Job_Application_details({ params }) {
  const [applicantDetail, setApplicantDetails] = useState(null);
  const applicantDetails = {
    id: parseInt(params.id), // Convert id to integer
    jobTitle: 'Product Designer',
    Name: 'Hassan Sani',
    ApplicantPhoto: '/images/default-avatar-profile-icon-of-social-media-user-vector.jpg',
    location: 'New York City',
    email: 'example.gmail.com',
    cvUrl: '/path/to/cv',
    
  };

  useEffect(() => {
    // Fetch applicant details from backend API based on the params.id
    const fetchApplicantDetails = async () => {
      try {
        const response = await fetch(`https://${DOMAIN_NAME}/applicants/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applicant details');
        }
        const data = await response.json();
        setApplicantDetails(data);
      } catch (error) {
        console.error('Error fetching applicant details:', error);
      }
    };

    fetchApplicantDetails();
  }, [params.id]);

 /* if (!applicantDetails) {
    return <div>Loading...</div>; // You can render a loading indicator while data is being fetched
  }*/

  return (
    <Layout>
      <>
        {/* <div id="overlayer" /> */}
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
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{
              backgroundImage:
                'url("/images/background.jpg")',
            }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold" />
                  <div className="custom-breadcrumbs">
                    <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                    <Link href="#">Job</Link> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
          <div className="container">
  <div className="row align-items-center mb-5">
    <div className="col-lg-8 mb-4 mb-lg-0">
      <div className="d-flex align-items-center">
        <div className="border p-2 d-inline-block mr-3 rounded">
          <img src={applicantDetails.ApplicantPhoto} alt="Applicant Photo" />
        </div>
        <div>
          <h2>{applicantDetails.Name}</h2>
          <div>
            <span className="ml-0 mr-2 mb-2">
              <span className="icon-briefcase mr-2" />
              {applicantDetails.jobTitle}
            </span>
            <span className="m-2">
              <span className="icon-room mr-2" />
              {applicantDetails.location}
            </span>
            <span className="m-2">
              <span className="icon-envelope mr-2" />
              {applicantDetails.email}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="row">
        <div className="col-12">
          <Link href={applicantDetails.cvUrl} target="_blank" className="btn btn-block btn-primary btn-md">
            Preview CV
          </Link>
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
