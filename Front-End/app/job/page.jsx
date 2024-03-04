'use client';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Badge } from 'flowbite-react';
import { HiCheck, HiClock } from 'react-icons/hi';
import CardComp from '../components/Card';
export default function Jobs() {
  const imageURl = 'images/job_logo_1.jpg';
  const jobData = [
    {
      id: 1,
      title: 'Front End',
      jobType: 'remote',
      jobTime: 'full time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '7000$',
      imageURl: 'images/job_logo_1.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 2,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 3,
      title: 'Front End',
      jobType: 'remote',
      jobTime: 'full time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '7000$',
      imageURl: 'images/job_logo_1.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 4,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 5,
      title: 'Front End',
      jobType: 'remote',
      jobTime: 'full time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '7000$',
      imageURl: 'images/job_logo_1.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 6,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 7,
      title: 'Front End',
      jobType: 'remote',
      jobTime: 'full time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '7000$',
      imageURl: 'images/job_logo_1.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 8,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 9,
      title: 'front End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 10,
      title: 'front End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 11,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
    {
      id: 12,
      title: 'back End',
      jobType: 'on site',
      jobTime: 'part time',
      location: 'Cairo',
      description: 'ay klam ',
      requirements: 'bla bla ',
      responsibilities: null,
      companyName: 'Inteliview',
      notes: '',
      salary: '8000$',
      imageURl: 'images/job_logo_2.jpg',
      isActive: true,
      isDeleted: false,
      companyUserId: '9e4fcedb-58bf-4592-b21f-5fcc54a51de5',
      companyUser: null,
      jobQuestions: null,
      jobInterestedTopics: null,
      createdAt: '2024-03-02T14:43:33.796Z',
      updatedAt: '2024-03-02T14:43:33.796Z',
      endedAt: '2024-03-02T14:43:33.796Z',
    },
  ];
  // const [jobListings, setJobListings] = useState([]);
  //   useEffect(() => {
  //     const fetchJobs = async () => {
  //       const authToken = Cookies.get('authToken');
  //       try {
  //         const response = await fetch('https://localhost:7049/api/Job/GetAll', {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         });
  //         if (response.ok) {
  //           const jobs = await response.json();
  //           setJobListings(jobs);
  //         }
  //       } catch (error) {
  //         console.log('error : ', error);
  //       }
  //     };
  //     fetchJobs();
  //   }, []);
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
    const filteredJobs = jobData.filter((job) => {
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
      setTotalPages(Math.ceil(jobData.length / jobsPerPage)); // Update total pages based on original job data
      const startIndex = (currentPage - 1) * jobsPerPage;
      const endIndex = Math.min(startIndex + jobsPerPage, jobData.length);
      setJobs(jobData.slice(startIndex, endIndex));
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
          <section
            className="section-hero home-section overlay inner-page bg-image"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">
                      The Easiest Way To Get Your Dream Job
                    </h1>
                    <p>Find your dream job!</p>
                  </div>
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
                        <select
                          className="selectpicker"
                          data-style="btn-white btn-lg"
                          data-width="100%"
                          title=" Remote/On Site Job "
                          onChange={(e) => {
                            handleChange('jobType', e.target.value);
                          }}
                        >
                          <option>Remote</option>
                          <option>On Site</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <select
                          onChange={(e) => {
                            handleChange('jobTime', e.target.value);
                          }}
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
            <Link href="#next" className="scroll-button smoothscroll">
              <span className=" icon-keyboard_arrow_down" />
            </Link>
          </section>
          <section className="site-section" id="next">
            <div className="container" id="job-listings">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">
                    {searchResult.length > 0 ||
                    (searchResult.length === 0 && test === true)
                      ? searchResult.length
                      : jobData.length}{' '}
                    Job Listed
                  </h2>
                </div>
              </div>
              <ul className="job-listings m-5 space-y-2 py-2">
                {/* {jobs.map((job, index) => (
                  <Link key={index} href={`/job/${job.id}`}>
                    <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                      <a href="job-single.html"></a>
                      <div className="job-listing-logo">
                        <img src={imageURl} alt="Image" className="img-fluid" />
                      </div>
                      <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                        <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                          <h2>{job.title}</h2>
                          <strong>{job.companyName}</strong>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge icon={HiCheck} size="">{job.jobType}</Badge>
                        </div>
                        <div
                          className="job-listing-location mb-3 mb-sm-0 custom-width w-25"
                          style={{ marginRight: "-120px" }}
                        >
                          <span className="icon-room">
                            {job.location},{job.location}
                          </span>
                        </div>
                        <div className="job-listing-meta">
                          <span
                            className={`badge ${
                              job.jobTime === "part time" ||
                              job.jobTime === "Part Time"
                                ? "badge-danger"
                                : "badge-success"
                            }`}
                          >
                            {job.jobTime}
                          </span>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))} */}
                {jobData.map((job) => (
                  <CardComp
                    title={job.title}
                    company={job.companyName}
                    location={job.location}
                    timePosted={new Date(job.createdAt).toDateString()}
                    employmentType={job.jobType}
                    categories={['marketing', 'finance']} // There's no equivalent in the jobData
                    jobTime={job.jobTime}
                    companyImageUrl={job.imageURl}
                    onClick={() => (window.location.href = `/job/${job.id}`)}
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
                      : jobData.length}{' '}
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
                          : jobData.length) / jobsPerPage
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
          <section
            className="py-5 bg-image overlay-primary fixed overlay"
            style={{ backgroundImage: 'url("/images/background.jpg")' }}
          >
            <div className="container" id="ayklam">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="text-white">Looking For A Job?</h2>
                  <p className="mb-0 text-white lead"> Find your dream job.</p>
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
        </div>
      </>
    </Layout>
  );
}
