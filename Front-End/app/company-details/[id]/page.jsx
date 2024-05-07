"use client";
import Layout from '../../components/Layout';
import React, { useState,useEffect, Suspense } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Loading from '../../components/loading';

function CompanyDetails({ params }) {
  const DOMAIN_NAME = 'localhost:7049/api';
  const authToken = Cookies.get('authToken');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${DOMAIN_NAME}/Job/CompanyDetails/`+ params.id, 
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
    <><></>
    {error &&<div>{alert}</div>}
    <link rel="stylesheet" href="/css/style.css"/>  
    <link rel="stylesheet" href="/css/edit-profile.css"/>
    
    {/* <div className="loader">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
    <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div> {/* .site-mobile-menu */}
        {/* NAVBAR */}
        {/* HOME */}
        <section className="section-hero overlay inner-page bg-image" style={{ backgroundImage: "url('/images/ai-background-business-technology-digital-transformation.jpg')" }} id="home-section">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Company Details</h1>
                <div className="custom-breadcrumbs">
                  <Link href="/job">Home</Link>
                  <span className="mx-2 slash">/</span>
                  <span className="text-white"><strong>Company Details</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container light-style flex-grow-1 container-p-y">

          <div className="card border-success rounded-4 mt-5 overflow-hidden border-width-2 background-color=" />
          <div className="card-body p-0">
            <div className="row">
              <div className="col-md-8 d-flex flex-column justify-content-between">
                <div className="card-body">
                  
                    <div className="form-company">
                      <h1 className="card-title" htmlFor="company-name">{data.companyName}</h1>

                      <div className="Type">
                        <label htmlFor="company-type">Type</label><br />
                        <span id="company-overview">{data.companyType}</span>
                      </div>
                      {/* Company overview */}
                      <div className="overview">
                        <label htmlFor="company-overview">Overview</label><br />
                        <span id="company-overview">{data.companyOverview}.</span>
                      </div>
                      {/* Company website */}
                      <div className="website">
                        <label htmlFor="company-website">Website</label><br />
                        <Link href="company-details" id="company-website">
                          {data.companyWebsite}
                        </Link>
                      </div>
                      {/* Company phone number */}
                      <div className="phone">
                        <label htmlFor="company-phone">Phone</label><br />
                        <span id="company-phone">{data.phoneNumber}</span>
                      </div>
                      {/* Company size and founded date */}
                      <div className="size">
                        <label htmlFor="company-size">Size</label><br />
                        <span id="company-size">{data.companySize}</span>
                      </div>
                      <div className="founded">
                        <label htmlFor="company-founded">Founded</label><br />
                        <span id="company-founded">{data.companyFounded}</span>
                      </div>
                    </div>
                  
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center pt-4 overflow-hidden">
                <img src="/images/company-profile-photo.jpg" alt="" className="d-block ui-w-80" />
              </div>
            </div>
          </div>
        </div>
      </div></>
  </Layout>
  );
}

export default CompanyDetails;
