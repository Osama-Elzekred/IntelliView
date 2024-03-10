// import { useNavigation } from 'next/navigation';
'use client';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DOMAIN_NAME = 'localhost:7049';

// const jobData =
//   {
//     id: 1,
//     title: "Front End",
//     jobType: "remote",
//     jobTime: "full time",
//     location: "Cairo",
//     description: "ay klam ",
//     requirements: "bla bla ",
//     responsibilities: null,
//     companyName: "Inteliview",
//     notes: "",
//     salary: "7000$",
//     imageURl: "images/job_logo_1.jpg",
//     isActive: true,
//     isDeleted: false,
//     companyUserId: "9e4fcedb-58bf-4592-b21f-5fcc54a51de5",
//     companyUser: null,
//     jobQuestions: null,
//     jobInterestedTopics: null,
//     createdAt: "2024-03-02T14:43:33.796Z",
//     updatedAt: "2024-03-02T14:43:33.796Z",
//     endedAt: "2024-03-02T14:43:33.796Z",
//   }
// ;

export default function Job_details({ params }) {
  // console.log(parseInt(params.id));
  const authToken = Cookies.get('authToken');
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/job/` + params.id,
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
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //const jobData = Object.keys(data).length > 0 ? [data] : [];
  //console.log(jobData);

  const date = new Date(data.createdAt);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  //console.log(jobData[0].createdAt);
  const date1 = new Date(data.endedAt);
  const options1 = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate1 = date1.toLocaleDateString('en-US', options1);

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
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{
              backgroundImage: 'url("/images/hero_1.jpg")',
            }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold" />
                  <div className="custom-breadcrumbs">
                    <Link href="#">Home</Link>{' '}
                    <span className="mx-2 slash">/</span>
                    <Link href="#">Job</Link>{' '}
                    <span className="mx-2 slash">/</span>
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
                      {/* {data.map((item) => ( */}
                        <h2>{data.title}</h2>
                      {/* ))} */}
                      <div>
                        <span className="ml-0 mr-2 mb-2">
                          <span className="icon-briefcase mr-2" />
                          {data.companyName}
                        </span>
                        <span className="m-2">
                          <span className="icon-room mr-2" />
                          {data.location}
                        </span>
                        <span className="m-2">
                          <span className="icon-clock-o mr-2" />
                          <span className="text-primary">{data.jobTime}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-6">
                      <Link href="#" className="btn btn-block btn-light btn-md">
                        <span className="icon-heart-o mr-2 text-danger" />
                        Save Job
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        href="/job/${id}/apply"
                        className="btn btn-block btn-primary btn-md"
                      >
                        Apply Now
                      </Link>
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
                    {/* {data.map((item) => ( */}
                      <span>{data.description}</span>
                    {/* ))} */}
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-rocket mr-3" />
                      Responsibilities
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                        {data?.responsibilities
                          ?.split(';') // Use a delimiter other than period (.)
                          .map((responsibility, index) => (
                            <li key={index} className="d-flex align-items-start mb-2">
                              <span className="icon-check_circle mr-2 text-muted" />
                              <span className='pb-1'>{responsibility}</span>
                            </li>
                          ))}
                      </ul>

                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-book mr-3" />
                      Requirements
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                        {data?.requirements
                          ?.split(/\.(?=\S)/) // Use regular expression to split by periods excluding empty strings
                          .map((requirement, index) => (
                            <li key={index} className="d-flex align-items-start mb-2">
                              <span className="icon-check_circle mr-2 text-muted" />
                              <span className='pb-1'>{requirement.trim()}</span>
                            </li>
                          ))}
                      </ul>


                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-4 text-primary">
                      <span className="icon-turned_in mr-3" />
                      Other Benifits
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                        {data?.benefits
                          ?.split(';') // Use a semicolon as the delimiter if benefits are separated by semicolons
                          .filter(benefit => benefit.trim()) // Remove any empty strings after splitting
                          .map((benefit, index) => (
                            <li key={index} className="d-flex align-items-start mb-2">
                              <span className="icon-check_circle mr-2 text-muted" />
                              <span>{benefit.trim()}</span>
                            </li>
                          ))}
                      </ul>

                  </div>
                  <div className="row mb-5">
                    <div className="col-6">
                      <Link href="#" className="btn btn-block btn-light btn-md">
                        <span className="icon-heart-o mr-2 text-danger" />
                        Save Job
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        href="/job/${id}/apply"
                        className="btn btn-block btn-primary btn-md"
                      >
                        Apply Now
                      </Link>
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
                        {formattedDate}
                      </li>
                      {/* <li className="mb-2">
                        <strong className="text-black">Vacancy:</strong> 20
                      </li> */}
                      <li className="mb-2">
                        <strong className="text-black">
                          Employment Status:
                        </strong>{' '}
                        {data.jobTime}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Experience:</strong>
                        {data.minimumExperience}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Job Location:</strong>{' '}
                        {data.location}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Salary:</strong>
                        {data.salary}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">
                          Application DeadLine:
                        </strong>{' '}
                        {formattedDate1}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-light p-3 border rounded">
                    <h3 className="text-primary  mt-3 h5 pl-3 mb-3 ">Share</h3>
                    <div className="px-3">
                      <Link href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-facebook" />
                      </Link>
                      <Link href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-twitter" />
                      </Link>
                      <Link href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-linkedin" />
                      </Link>
                      <Link href="#" className="pt-3 pb-3 pr-3 pl-0">
                        <span className="icon-pinterest" />
                      </Link>
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
              <ul className="job mb-5">
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
                      <strong>{data.companyName}</strong>
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
                    <Link href="#" className="prev">
                      Prev
                    </Link>
                    <div className="d-inline-block">
                      <Link href="#" className="active">
                        1
                      </Link>
                      <Link href="#">2</Link>
                      <Link href="#">3</Link>
                      <Link href="#">4</Link>
                    </div>
                    <Link href="#" className="next">
                      Next
                    </Link>
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
                    <Link
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-apple mr-3" />
                      App Store
                    </Link>
                    <span> </span>
                    <Link
                      href="#"
                      className="btn btn-dark btn-md px-4 border-width-2"
                    >
                      <span className="icon-android mr-3" />
                      Play Store
                    </Link>
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
