// Import Layout component
'use client';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import React, { useState, useEffect } from 'react';

export default function JobApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  useEffect(() => {
    // Function to fetch applicant data
    const fetchApplicantsData = async () => {
      try {
        // Assuming you have an endpoint to fetch applicant data
        const response = await fetch(`https://${DOMAIN_NAME}/applicants`);
        if (!response.ok) {
          throw new Error('Failed to fetch applicants data');
        }
        const data = await response.json();
        setApplicants(data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    // Call the fetch function
    fetchApplicantsData();
  }, []); // Empty dependency array means this effect will run once on component mount


  const handleSubmit = (event) => {
    event.preventDefault();
    // Filter applicants based on search query
    const filtered = applicants.filter(applicant =>
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredApplicants(filtered);
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
                  <div className="col-md-12 text-center">
            <h1 className="mb-4">Search Job Applicants</h1>
            <form onSubmit={handleSubmit} className="search-jobs-form">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <input
                    type="text"
                    className="form-control form-control-lg mb-3"
                    placeholder="Enter job applicant name"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">
                    Search
                  </button>
                </div>
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
          <section className="site-section" id="next">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2">Job Applicants</h2>
          </div>
        </div>
        <ul className="applicant-listings mb-5" id="applicantListings">
          {/* Applicant listings will be dynamically added here */}
          {applicants.map((applicant, index) => (
            <li key={index} className="applicant-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
              <div className="applicant-details d-sm-flex custom-width w-100 justify-content-between mx-4">
                <div className="applicant-info custom-width w-50 mb-3 mb-sm-0">
                  <h2>{applicant.name}</h2>
                  <strong>{applicant.company}</strong>
                </div>
                <div className="applicant-location mb-3 mb-sm-0 custom-width w-25">
                  <span className="icon-room" /> {applicant.location}
                </div>
                <div className="applicant-meta">
                  <span className="badge badge-primary">{applicant.status}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="row pagination-wrap">
          <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
            <span id="paginationInfo">Showing {applicants.length} Applicants</span>
          </div>
        </div>
      </div>
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
