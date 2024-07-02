'use client';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CardComp from '../../components/Card';
import Loading from '../../components/loading';
import { Breadcrumb } from '../../components/components';
import {Badge} from 'flowbite-react';
import config from '../../../config';

export default function userJobs() {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DOMAIN_NAME } = config;
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/JobApplication/GetUserJobs`,
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
        const jobs = await response.json();
        setJobListings(jobs.reverse());
        //console.log(jobs);
        setLoading(false);
      } catch (error) {
        console.error('error : ', error);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    // Assuming jobListings is already populated with the full list of jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  
    setJobs(currentJobs);
    setLoading(false);
    // Calculate total pages
    setTotalPages(Math.ceil(jobListings.length / jobsPerPage));
  }, [currentPage, jobListings]);
  
    const changePage = (page) => {
      setCurrentPage(page);
      setTimeout(() => {
        document
          .getElementById('job-listings')
          .scrollIntoView({ behavior: 'smooth' });
      }, 200);
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        setTimeout(() => {
          document
            .getElementById('job-listings')
            .scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else if (currentPage === 1) {
        setCurrentPage(currentPage);
      }
    };
  
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        setTimeout(() => {
          document
            .getElementById('job-listings')
            .scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    };

  

 if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

  return (
    <Layout>
      <>
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
          <Breadcrumb links={[{ name: 'My Jobs', url: '#' }]} />
          <section className="site-section" id="next">
            <div className="container" id="job-listings">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                <h2 className="section-title mb-2">
                    {jobListings.length}{'  '}
                    Job Listed
                  </h2>
                </div>
              </div>
              <ul className="job-listings m-5 space-y-2 py-2">
                {jobs.map((job) => (
                  <CardComp
                    key={job.jobDto.id}
                    title={job.jobDto.title}
                    company={job.jobDto.companyName}
                    location={job.jobDto.location}
                    timePosted={new Date(job.jobDto.createdAt).toDateString()}
                    employmentType={job.jobDto.jobType}
                    categories={job.jobDto.jobInterestedTopic} // There's no equivalent in the jobData
                    jobTime={job.jobDto.jobTime}
                    status={job.status}
                    companyImageUrl={job.jobDto.imageURl}
                    onClick={() => (window.location.href = `/job/user-jobs`)}
                  />
                ))}
              </ul>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                  <span>
                    Showing 1-5 Of{' '}
                    {jobListings.length}{' '}
                    Jobs
                  </span>
                </div>
                <div className="col-md-6 text-center text-md-right">
                  <div className="custom-pagination ml-auto mt-2">
                    {currentPage !== 1 && (
                      <Link href="#" className="prev" onClick={prevPage}>
                        Prev
                      </Link>
                    )}
                    {[...Array(totalPages).keys()].map((page) => (
                      <Link
                        key={page + 1}
                        href="#"
                        className={page + 1 === currentPage ? 'active' : ''}
                        onClick={() => changePage(page + 1)}
                      >
                        {page + 1}
                      </Link>
                    ))}
                    {currentPage < totalPages && (
                      <Link href="" className="next" onClick={nextPage}>
                        Next
                      </Link>
                    )}
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
