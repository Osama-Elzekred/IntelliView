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
//import config from '../../../config';

const { DOMAIN_NAME } = config;
export default function userJobs() {
  // const DOMAIN_NAME = 'localhost:7049';
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { DOMAIN_NAME } = config;
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
        setJobListings(jobs);
        //console.log(jobs);
        setLoading(false);
      } catch (error) {
        //console.log(authToken);
        setJobListings(jobs);

        console.error('error : ', error);
      }
    };
    fetchJobs();
  }, []);
  const [searchForm, setSearchForm] = useState({
    title: '',
    jobType: '',
    jobTime: '',
  });
  const handleChange = async (field, value) => {
    setSearchForm({ ...searchForm, [field]: value });
  };
  const [test, setTest] = useState(false);
  const handleSearch = async () => {
    setTest(true);
    const filteredJobs = jobListings.filter((job) => {
      // Filter by title
      if (
        searchForm.title &&
        !job.title.toLowerCase().includes(searchForm.title.toLowerCase())
      ) {
        return false;
      }
      // Filter by remote status
      if (
        searchForm.jobType &&
        !job.jobType.toLowerCase().includes(searchForm.jobType.toLowerCase())
      ) {
        return false;
      }
      // Filter by job type
      if (
        searchForm.jobTime &&
        !job.jobTime.toLowerCase().includes(searchForm.jobTime.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setSearchResult(filteredJobs);
    setCurrentPage(1);
    document
      .getElementById('job-listings')
      .scrollIntoView({ behavior: 'smooth' });
  };
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const jobsPerPage = 5;

  useEffect(() => {
    if (
      searchResult.length > 0 ||
      (searchResult.length === 0 && test === true)
    ) {
      setTotalPages(Math.ceil(searchResult.length / jobsPerPage)); // Update total pages based on search result
      setJobs(
        searchResult.slice(
          (currentPage - 1) * jobsPerPage,
          currentPage * jobsPerPage
        )
      );
    } else {
      setTotalPages(Math.ceil(jobListings.length / jobsPerPage)); // Update total pages based on original job data
      const startIndex = (currentPage - 1) * jobsPerPage;
      const endIndex = Math.min(startIndex + jobsPerPage, jobListings.length);
      setJobs(jobListings.slice(startIndex, endIndex));
    }
  }, [currentPage, searchResult]);
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

  let badgeColor;
  let statusText;

  

  // if (loading) {
  //   return <Loading />; // Display loading indicator while data is being fetched
  // }

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
                    {searchResult.length > 0 ||
                    (searchResult.length === 0 && test === true)
                      ? searchResult.length
                      : jobListings.length}{' '}
                    Job Listed
                  </h2>
                </div>
              </div>
              <ul className="job-listings m-5 space-y-2 py-2">
                {jobListings.map((job) => (
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
                    Showing{' '}
                    {jobs.length === 0 ? 0 : jobs.length - (jobs.length - 1)}-
                    {jobs.length} Of{' '}
                    {searchResult.length > 0 ||
                    (searchResult.length === 0 && test === true)
                      ? searchResult.length
                      : jobListings.length}{' '}
                    Jobs
                  </span>
                </div>
                <div className="col-md-6 text-center text-md-right">
                  <div className="custom-pagination ml-auto">
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
                    {searchResult.length > 0 || jobListings.length > 0
                      ? currentPage !==
                          Math.ceil(
                            (searchResult.length > 0
                              ? searchResult.length
                              : jobListings.length) / jobsPerPage
                          ) && (
                          <Link href="#" className="next" onClick={nextPage}>
                            Next
                          </Link>
                        )
                      : null}
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
