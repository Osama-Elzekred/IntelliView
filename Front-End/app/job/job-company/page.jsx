'use client';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Card, Loading, Breadcrumb } from '../../components/components';

export default function Jobs() {
  // const imageURl = 'images/job_logo_1.jpg';
  const [jobListings, setJobListings] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const jobsPerPage = 5;
  const [test, setTest] = useState(false);
  const [searchForm, setSearchForm] = useState({
    title: '',
    jobType: '',
    jobTime: '',
  });
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
      return true;
    });
    setSearchResult(filteredJobs);
    setCurrentPage(1);
    document
      .getElementById('job-listings')
      .scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch(
          'https://localhost:7049/api/Job/CompanyJobs',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const jobs = await response.json();
          setJobListings(jobs);
        }
        setLoading(false);
      } catch (error) {
        console.log('error : ', error);
      }
    };
    fetchJobs();
  }, [currentPage, searchResult]);

  // setTime out to make delay until the data come from server to store it in jobs . #hossam
  setTimeout(() => {
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
          <Breadcrumb links={[{ name: 'Company Avilable Jobs', link: '#' }]} />
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <form method="post" className="search-jobs-form">
                  <div className="row mb-5">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Job title, Company..."
                        onChange={(e) => {
                          handleChange('title', e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="btn btn-primary btn-lg btn-block text-white btn-search"
                      >
                        <span className="icon-search icon mr-2" />
                        Search Job
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 popular-keywords">
                      <h3>Trending Keywords:</h3>
                      <ul className="keywords list-unstyled m-0 p-0">
                        <li>
                          <Link href="#" className="">
                            UI Designer
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="">
                            Python
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="">
                            Developer
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <section className="" id="next">
            <div className="container" id="job-listings">
              <div className="row mb-3 justify-content-center">
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
                {jobs.map((job) => (
                  <Card
                    title={job.title}
                    company={job.companyName}
                    location={job.location}
                    timePosted={new Date(job.createdAt).toDateString()}
                    employmentType={job.jobType}
                    categories={['marketing', 'finance']} // There's no equivalent in the jobData
                    jobTime={job.jobTime}
                    companyImageUrl={job.imageURl}
                    onClick={() =>
                      (window.location.href = `/job/job-company/${job.id}`)
                    }
                  />
                ))}
              </ul>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                  <span>
                    Showing 1-5 Of{' '}
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
          </section>
        </div>
      </>
    </Layout>
  );
}
