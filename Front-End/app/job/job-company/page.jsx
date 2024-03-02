// Import Layout component
'use client';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Function to fetch job data
    const fetchJobsData = async () => {
      try {
        // Assuming you have an endpoint to fetch job data
        const response = await fetch(`https://${DOMAIN_NAME}/CompanyJobs`);
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    // Call the fetch function
    fetchJobsData();
  }, []); // Empty dependency array means this effect will run once on component mount


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
          <header className="site-navbar mt-3">
            <div id="header-content" />
          </header>
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
                    Jobs Posted
                    </h1>
                    <p>Find jobs posted by different companies!</p>
                  </div>
                  <form method="post" className="search-jobs-form">
                    <div className="row mb-5">
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Job title"
                        />
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <select
                          className="selectpicker"
                          data-style="btn-white btn-lg"
                          data-width="100%"
                          title=" Remote/On Site Job "
                        >
                          <option>Remote</option>
                          <option>On Site</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <select
                          className="selectpicker"
                          data-style="btn-white btn-lg"
                          data-width="100%"
                          title=" Part Time/Full Time "
                        >
                          <option>Part Time</option>
                          <option>Full Time</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block text-white btn-search"
                        >
                          <span className="icon-search icon mr-2" />
                          Search Job
                        </button>
                      </div>
                    </div>
                  </form>
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
        <ul className="list-group">
                {jobs.map((job, index) => (
                  <li key={index} className="list-group-item">
                    <div className="row">
                      <div className="col-md-8">
                        <h5 className="mb-0">{job.title}</h5>
                        <p>{job.companyName}</p>
                        <p>{job.location}</p>
                        <p>Job Type: {job.jobType}</p>
                        <p>Job Time: {job.jobTime}</p>
                        {/* You can add more job details here */}
                      </div>
                      <div className="col-md-4 text-right">
                        <Link href={`/job/${job.id}`}>
                          <a className="btn btn-primary">View Details</a>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
        <div className="row pagination-wrap">
          <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
            <span id="paginationInfo">Showing {jobs.length} Applicants</span>
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
