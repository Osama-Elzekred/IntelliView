// import { useNavigation } from 'next/navigation';
'use client';
import Layout from '../../../../../components/Layout';
import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie';
import React, { useState, useEffect, Suspense } from 'react';
import Loading from '../../../../../components/loading';
export default function Job_Application_details({ params}) {
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
    const DOMAIN_NAME = 'localhost:7049/api';
    

    useEffect(() => {
      const fetchData = async () => {
        try {
        const authToken = Cookies.get('authToken');
        const response = await fetch(
          `https://${DOMAIN_NAME}/JobApplication/Application/${params.id}/${params.userid}`,
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
      fetchData();
  }, [params.id, params.userid]);
  
 const ApplicantPhoto =  '/images/default-avatar-profile-icon-of-social-media-user-vector.jpg';
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
          <img src={ApplicantPhoto} alt="Applicant Photo" />
        </div>
        
          <div>
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
            <Link href={applicantDetails.cvurl} target="_blank" className="btn btn-block btn-primary btn-md">
              Preview CV
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

          </section>
          
        </div>
      </>
    </Layout>
  );
}
