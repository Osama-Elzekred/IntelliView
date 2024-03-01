import Layout from '../components/Layout';
import Link from 'next/link';

export default function Jobs() {
  return (
    <Layout>
      <>
        {/* <div id="overlayer" /> */}
        {/* <div className="loader">
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
            </Link>
              <span className=" icon-keyboard_arrow_down" />
          </section>
          <section className="site-section" id="next">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">43,167 Job Listed</h2>
                </div>
              </div>
              <ul className="job mb-5" id="jobListings">
                {/* Job listings will be dynamically added here */}
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="images/job_logo_1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>Product Designer</h2>
                      <strong>Adidas</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> New York, New York
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-danger">Part Time</span>
                    </div>
                  </div>
                </li>
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="images/job_logo_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>Digital Marketing Director</h2>
                      <strong>Sprint</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> Overland Park, Kansas
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-success">Full Time</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
                  <span id="paginationInfo">Showing 1-10 of 43,167 Jobs</span>
                </div>
                <div className="col-md-6 text-center text-md-right">
                  <div className="custom-pagination ml-auto" id="pagination">
                    {/* Pagination links will be dynamically added here */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="py-5 bg-image overlay-primary fixed overlay"
            style={{ backgroundImage: 'url("images/background.jpg")' }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="text-white">Looking For A Job?</h2>
                  <p className="mb-0 text-white lead"> Find your dream job.</p>
                </div>
                <div className="col-md-3 ml-auto">
                  <Link href="/login"
                    className="btn btn-warning btn-block btn-lg">
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
