// import { useNavigation } from 'next/navigation';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Job_details({ params }) {
  console.log(parseInt(params.id));
  return (
    <Layout>
      <>
        {/* <div id="overlayer" /> */}
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
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{
              backgroundImage:
                'url("/images/hero_1.jpg")',
            }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold" />
                  <div className="custom-breadcrumbs">
                    <a href="#">Home</a> <span className="mx-2 slash">/</span>
                    <a href="#">Job</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="border p-2 d-inline-block mr-3 rounded">
                      <img src="/images/job_logo_5.jpg" alt="Image" />
                    </div>
                    <div>
                      <h2>Product Designer</h2>
                      <div>
                        <span className="ml-0 mr-2 mb-2">
                          <span className="icon-briefcase mr-2" />
                          Puma
                        </span>
                        <span className="m-2">
                          <span className="icon-room mr-2" />
                          New York City
                        </span>
                        <span className="m-2">
                          <span className="icon-clock-o mr-2" />
                          <span className="text-primary">Full Time</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                      <a href="#" className="btn btn-block btn-light btn-md">
                        <span className="icon-heart-o mr-2 text-danger" />
                        Save Job
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="#" className="btn btn-block btn-primary btn-md">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="mb-5">
                    <figure className="mb-5">
                      <img
                        src="/images/job_single_img_1.jpg"
                        alt="Image"
                        className="img-fluid rounded"
                      />
                    </figure>
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-align-left mr-3" />
                      Job Description
                    </h3>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-rocket mr-3" />
                      Responsibilities
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-book mr-3" />
                      Education + Experience
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-turned_in mr-3" />
                      Other Benifits
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                      <li className="d-flex align-items-start mb-2">
                        <span className="icon-check_circle mr-2 text-muted" />
                        <span />
                      </li>
                    </ul>
                  </div>
                  <div className="row mb-5">
                    <div className="col-6">
                      <a href="#" className="btn btn-block btn-light btn-md">
                        <span className="icon-heart-o mr-2 text-danger" />
                        Save Job
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="#" className="btn btn-block btn-primary btn-md">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="bg-light p-3 border rounded mb-4">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">
                      Job Summary
                    </h3>
                    <ul className="list-unstyled pl-3 mb-0">
                      <li className="mb-2">
                        <strong className="text-black">Published on:</strong>{' '}
                        April 14, 2019
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Vacancy:</strong> 20
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">
                          Employment Status:
                        </strong>{' '}
                        Full-time
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Experience:</strong> 2 to
                        3 year(s)
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Job Location:</strong>{' '}
                        New ork City
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Salary:</strong> $60k -
                        $100k
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Gender:</strong> Any
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">
                          Application Deadline:
                        </strong>{' '}
                        April 28, 2019
                      </li>
                    </ul>
                  </div>
                  <div className="bg-light p-3 border rounded">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                    <div className="px-3">
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-facebook" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-twitter" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-linkedin" />
                      </a>
                      <a href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-pinterest" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section" id="next">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">22,392 Related Jobs</h2>
                </div>
              </div>
              <ul className="job-listings mb-5">
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                  <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="/images/job_logo_1.jpg"
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
                      src="/images/job_logo_2.jpg"
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
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="/images/job_logo_3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>Back-end Engineer (Python)</h2>
                      <strong>Amazon</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> Overland Park, Kansas
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-success">Full Time</span>
                    </div>
                  </div>
                </li>
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="/images/job_logo_4.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>Senior Art Director</h2>
                      <strong>Microsoft</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> Anywhere
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-success">Full Time</span>
                    </div>
                  </div>
                </li>
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="/images/job_logo_5.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                    <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                      <h2>Product Designer</h2>
                      <strong>Puma</strong>
                    </div>
                    <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                      <span className="icon-room" /> San Mateo, CA
                    </div>
                    <div className="job-listing-meta">
                      <span className="badge badge-success">Full Time</span>
                    </div>
                  </div>
                </li>
                <li className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <Link href="/job/id"></Link>
                  <div className="job-listing-logo">
                    <img
                      src="/images/job_logo_1.jpg"
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
                      src="/images/job_logo_2.jpg"
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
                  <span>Showing 1-7 Of 22,392 Jobs</span>
                </div>
                <div className="col-md-6 text-center text-md-right">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">
                      Prev
                    </a>
                    <div className="d-inline-block">
                      <a href="#" className="active">
                        1
                      </a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">
                      Next
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-light pt-5 testimony-full">
            <div className="owl-carousel single-carousel">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 align-self-center text-center text-lg-left">
                    <blockquote>
                      <p>
                        “Soluta quasi cum delectus eum facilis recusandae
                        nesciunt molestias accusantium libero dolores repellat
                        id in dolorem laborum ad modi qui at quas dolorum
                        voluptatem voluptatum repudiandae.”
                      </p>
                      <p>
                        <cite> — Corey Woods, @Dribbble</cite>
                      </p>
                    </blockquote>
                  </div>
                  <div className="col-lg-6 align-self-end text-center text-lg-right">
                    <img
                      src="/images/person_transparent_2.png"
                      alt="Image"
                      className="img-fluid mb-0"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 align-self-center text-center text-lg-left">
                    <blockquote>
                      <p>
                        “Soluta quasi cum delectus eum facilis recusandae
                        nesciunt molestias accusantium libero dolores repellat
                        id in dolorem laborum ad modi qui at quas dolorum
                        voluptatem voluptatum repudiandae.”
                      </p>
                      <p>
                        <cite> — Chris Peters, @Google</cite>
                      </p>
                    </blockquote>
                  </div>
                  <div className="col-lg-6 align-self-end text-center text-lg-right">
                    <img
                      src="/images/person_transparent.png"
                      alt="Image"
                      className="img-fluid mb-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="pt-5 bg-image overlay-primary fixed overlay"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
                  <h2 className="text-white">Get The Mobile Apps</h2>
                  <p className="mb-5 lead text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    tempora adipisci impedit.
                  </p>
                  <p className="mb-0">
                    <a
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-apple mr-3" />
                      App Store
                    </a>
                    <a
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-android mr-3" />
                      Play Store
                    </a>
                  </p>
                </div>
                <div className="col-md-6 ml-auto align-self-end">
                  <img
                    src="/images/apps.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
}
