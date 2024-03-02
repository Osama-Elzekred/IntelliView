// components/CompanyDetails.js
import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const CompanyDetails = () => {
  return (
    <Layout>
    <><></>
    <link rel="stylesheet" href="/css/style.css"/>  
    <link rel="stylesheet" href="/css/edit-profile.css"/>
    
    <div className="loader">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div><div className="site-wrap">
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
                    <h1 className="card-title" htmlFor="company-name">Company Name</h1>

                    <div className="overview">
                      <label htmlFor="company-type">Type</label><br />
                      <span id="company-overview">IT</span>
                    </div>
                    {/* Company overview */}
                    <div className="overview">
                      <label htmlFor="company-overview">Overview</label><br />
                      <span id="company-overview">hassannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.</span>
                    </div>
                    {/* Company website */}
                    <div className="website">
                      <label htmlFor="company-website">Website</label><br />
                      <Link href="company-details" id="company-website">
                        www.example.com
                      </Link>
                    </div>
                    {/* Company phone number */}
                    <div className="phone">
                      <label htmlFor="company-phone">Phone</label><br />
                      <span id="company-phone">123-456-7890</span>
                    </div>
                    {/* Company size and founded date */}
                    <div className="size">
                      <label htmlFor="company-size">Size</label><br />
                      <span id="company-size">Large</span>
                    </div>
                    <div className="founded">
                      <label htmlFor="company-founded">Founded</label><br />
                      <span id="company-founded">2000</span>
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
