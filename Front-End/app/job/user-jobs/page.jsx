"use client";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HiCheck, HiClock } from "react-icons/hi";
import CardComp from "../../components/Card";
import { Badge } from "flowbite-react";
import Loading from "../../components/loading";


export default function userJobs() {
 
  const DOMAIN_NAME = "localhost:7049";
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      const fetchJobs = async () => {
      const authToken = Cookies.get('authToken');
      try {
          const response = await fetch(`https://${DOMAIN_NAME}/api/JobApplication/GetUserJobs`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const jobs = await response.json();
          setJobListings(jobs);
          console.log(jobs);
          setLoading(false);
          
      } catch (error) {
          console.log('error : ', error);
      }
      };
      fetchJobs();
    }, []);
  const [searchForm, setSearchForm] = useState({
    title: "",
    jobType: "",
    jobTime: "",
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
      .getElementById("job-listings")
      .scrollIntoView({ behavior: "smooth" });
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
        .getElementById("job-listings")
        .scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        document
          .getElementById("job-listings")
          .scrollIntoView({ behavior: "smooth" });
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
          .getElementById("job-listings")
          .scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

    let badgeColor;
    let statusText;
  

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
          </div>{" "}
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
                            handleChange("title", e.target.value);
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
                            handleChange("jobType", e.target.value);
                          }}
                        >
                          <option>Remote</option>
                          <option>On Site</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <select
                          onChange={(e) => {
                            handleChange("jobTime", e.target.value);
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
                      : jobListings.length}{" "}
                    Job Listed
                  </h2>
                </div>
              </div>
              <ul className="job-listings m-5 space-y-2 py-2">
                {jobListings.map((job) => (
                  <CardComp
                    title={job.jobDto.title}
                    company={job.jobDto.companyName}
                    location={job.jobDto.location}
                    timePosted={new Date(job.jobDto.createdAt).toDateString()}
                    employmentType={job.jobDto.jobType}
                    categories={job.jobDto.jobInterestedTopic} // There's no equivalent in the jobData
                    jobTime={job.jobDto.jobTime}
                    status={job.status}
                    companyImageUrl={job.jobDto.imageURl}
                    onClick={() => (window.location.href = `/job/${job.jobDto.id}`)}
                  />
                ))}
                  {/* <div className='flex flex-wrap gap-2'>                
                    <Badge color={badgeColor}>{statusText}</Badge>
                  </div> */}
              </ul>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                  <span>
                    Showing{" "}
                    {jobs.length === 0 ? 0 : jobs.length - (jobs.length - 1)}-
                    {jobs.length} Of{" "}
                    {searchResult.length > 0 ||
                    (searchResult.length === 0 && test === true)
                      ? searchResult.length
                      : jobListings.length}{" "}
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
                        className={page + 1 === currentPage ? "active" : ""}
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
