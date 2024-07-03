'use client';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CardComp from '../components/Card';
import Loading from '../components/loading';
import { Breadcrumb, Filterbar, Searchbar } from '../components/components';
import config from '../../config';

export default function Jobs() {
  const [jobListings, setJobListings] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { DOMAIN_NAME } = config;
  const [jobs, setJobs] = useState([]);
  const jobsPerPage = 5;
  const [test, setTest] = useState(false);
  const [searchForm, setSearchForm] = useState({
    title: '',
    jobType: '',
    jobTime: '',
    location: '',
    categories: '',
  });
  const [authToken, setAuthToken] = useState(Cookies.get('authToken'));
  const handleChange = async (field, value) => {
    setSearchForm({ ...searchForm, [field]: value });
  };
  const [loading, setLoading] = useState(true);
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
      //filter by location
      if (
        searchForm.location &&
        !job.location.toLowerCase().includes(searchForm.location.toLowerCase())
      ) {
        return false;
      }
      //filter by jobInterestedTopic
      if (
        searchForm.categories &&
        !job.jobInterestedTopic
          .join(' ')
          .toLowerCase()
          .includes(searchForm.categories.toLowerCase())
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
  const resetFilters = () => {
    setSearchForm({
      title: '',
      jobType: '',
      jobTime: '',
      location: '',
      categories: '',
    });
    handleSearch();
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const authToken = Cookies.get('authToken');

      try {
        const response = await fetch(`https://${DOMAIN_NAME}/api/Job/GetAll`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const jobs = await response.json();
          const filteredJobs = jobs.filter((job) => job.isActive).reverse();
          setJobListings(filteredJobs);
        }
        setLoading(false);
      } catch (error) {
        console.error('error : ', error);
      }
    };
    fetchJobs();
  }, [currentPage, searchResult]);

  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 1);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [searchResult, test, currentPage, jobListings, jobsPerPage]); // Add dependencies that, when changed, should re-trigger this effect

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

  //  if (loading) {
  //     return <Loading />; // Display loading indicator while data is being fetched
  //   }

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
          <Breadcrumb
            links={[
              // { name: 'Home', url: '/' },
              { name: 'Jobs', url: '/job' },
            ]}
          />
          {/* <section className="site-section" id="next"> */}
          <div className="container" id="job-listings">
            <div className="mb-3 text-center">
              <h1 className="text-black font-weight-bold">
                The Easiest Way To Get Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {' '}
                  Dream Job
                </span>
              </h1>
            </div>
            <div className="search-jobs-form p-2">
              <div className="search-jobs-form">
                <Searchbar
                  handleChange={(e) => handleChange('title', e.target.value)}
                  handleSearch={() => handleSearch()}
                />
              </div>
            </div>
            <svg
              className="my-2 w-full"
              xmlns="http://www.w3.org/2000/svg"
              width={1216}
              height={2}
              viewBox="0 0 1216 2"
              fill="none"
            >
              <path d="M0 1H1216" stroke="#E5E7EB" />
            </svg>
            <div className="row mb-2 justify-content-center">
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
            <div className="flex flex-col-reverse md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <div className="w-full md:w-1/4 ">
                <Filterbar
                  searchForm={searchForm}
                  handleChange={handleChange}
                  resetFilters={resetFilters}
                  handleSearch={handleSearch}
                />
              </div>
              <ul className="m-2 space-y-2 py-2 flex-grow flex-1 bg-white shadow-md p-4">
                {jobs.map((job, index) => (
                  <CardComp
                    key={index}
                    title={job.title}
                    company={job.companyName}
                    location={job.location}
                    timePosted={new Date(job.createdAt).toDateString()}
                    employmentType={job.jobType}
                    EndDate={job.endedAt}
                    categories={job.jobInterestedTopic} // There's no equivalent in the jobData
                    jobTime={job.jobTime}
                    companyImageUrl={job.imageURl}
                    onClick={() => (window.location.href = `/job/${job.id}`)}
                  />
                ))}
              </ul>
            </div>

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
                  {currentPage !==
                    Math.ceil(
                      (searchResult.length > 0
                        ? searchResult.length
                        : jobListings.length) / jobsPerPage
                    ) && (
                    <Link href="#" className="next" onClick={nextPage}>
                      Next
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* </section> */}
          {authToken === null && (
            <section
              className="py-5 mt-2 bg-image overlay-primary fixed overlay"
              style={{ backgroundImage: 'url("/images/background.jpg")' }}
            >
              <div className="container" id="ayklam">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="text-white">Looking For A Job?</h2>
                    <p className="mb-0 text-white lead">
                      {' '}
                      Find your dream job.
                    </p>
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
          )}
        </div>
      </>
    </Layout>
  );
}
