// import { useNavigation } from 'next/navigation';
'use client';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';
import { Badge } from 'flowbite-react';
import config from '../../../config.js';
//import { useRouter } from 'next/router';

import { Breadcrumb } from '../../components/components';
// const DOMAIN_NAME = 'localhost:7049';

export default function JobDetails({ params }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFromServer, setRoleFromServer] = useState(null);
  const authToken = Cookies.get('authToken');
  // const router = useRouter();
  // const { id } = router.query;
  const { DOMAIN_NAME } = config;

  useEffect(() => {
    // Access localStorage only on the client side
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('roleFromServer');
      setRoleFromServer(role);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/job/` + + params.id,
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, params.id]);
  // if (!data) {
  //   return <Loading />;
  // }

  //const jobData = Object.keys(data).length > 0 ? [data] : [];
  ////console.log(jobData);

  const date = new Date(data.createdAt);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  ////console.log(jobData[0].createdAt);
  const date1 = new Date(data.endedAt);
  const options1 = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate1 = date1.toLocaleDateString('en-US', options1);

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

  return (
    <Layout>
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

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
          <Breadcrumb
            links={[
              { name: 'Jobs', link: '/job' },
              { name: 'Job Details', link: `/job/${params.id}` },
            ]}
          />
          <section className="">
            <div className="container">
              <div className="flex flex-col lg:flex-row lg:items-center mb-5">
                <div className="lg:flex-1 mb-4 lg:mb-0">
                  <div className="flex items-center">
                    <img
                      className="w-20 h-20 object-cover rounded-full border inline-block mr-3"
                      src={data.imageURl}
                      alt="CompanyImage"
                    />
                    <div>
                      <div className="flex flex-row justify-start space-x-2 space-y-2 ml-2">
                        <h2>{data.title}</h2>
                        {new Date(data.endedAt) < Date.now() && (
                          <Badge className="text-red-500 rounded-full bg-red-100  justify-center text-sm font-semibold">
                            Closed
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2">
                        <Link href={`/company-details/${data.companyUserId}`}>
                          <span className="mr-2 mb-2 inline-block">
                            <span className="icon-briefcase mr-2" />
                            {data.companyName}
                          </span>
                        </Link>
                        <span className="m-2 inline-block">
                          <span className="icon-room mr-2" />
                          {data.location}
                        </span>
                        <span className="m-2 inline-block">
                          <span className="icon-clock-o mr-2" />
                          <span className="text-primary">{data.jobTime}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3 w-full">
                  <div className="flex space-x-2">
                    <Link
                      href={`/job/post/${params.id}`}
                      className="btn btn-light btn-md w-1/2"
                    >
                      <span className="fa-solid fa-pen-to-square mr-2" />
                      Edit job
                    </Link>
                    {roleFromServer && roleFromServer.toLowerCase() === 'user' &&
                    new Date(data.endedAt) > Date.now() ? (
                      <Link
                        href={`/job/${params.id}/apply`}
                        className="btn btn-primary btn-md w-1/2"
                        target="_blank"
                      >
                        Apply Now
                      </Link>
                    ) : (
                      <button className="btn btn-primary btn-md w-1/2" disabled>
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8">
                  <div className="mb-3">
                    <figure className="mb-5">
                      <img
                        src="/images/job_single_img_1.jpg"
                        alt="Image"
                        className="img-fluid rounded"
                      />
                    </figure>
                    <h3 className="h5 d-flex align-items-center mb-2 text-primary">
                      <span className="icon-align-left mr-3" />
                      Job Description
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      {data?.description
                        ?.split(/[\.\n](?=\S)/)
                        .map((description, index) => (
                          <li
                            key={index}
                            className="d-flex align-items-baseline"
                          >
                            <span className="icon-check_circle mr-2 text-muted" />
                            <span className="pb-1">{description.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mb-5">
                    <h3 className="h5 d-flex align-items-center mb-3 text-primary">
                      <span className="icon-book mr-3" />
                      Requirements
                    </h3>
                    <ul className="list-unstyled m-0 p-0">
                      {data?.requirements
                        ?.split(/[\.\n](?=\S)/)
                        .map((requirement, index) => (
                          <li
                            key={index}
                            className="d-flex align-items-baseline "
                          >
                            <span className="icon-check_circle mr-2 text-muted" />
                            <span className="pb-1">{requirement.trim()}</span>
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
                      {roleFromServer && roleFromServer.toLowerCase() === 'user' &&
                      new Date(data.endedAt) > Date.now() ? (
                        <Link
                          href={`/job/${params.id}/apply`}
                          className="btn btn-block btn-primary btn-md"
                          target="_blank"
                        >
                          Apply Now
                        </Link>
                      ) : (
                        <button
                          className="btn btn-block btn-primary btn-md"
                          disabled
                        >
                          Apply Now
                        </button>
                      )}
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
                        <strong className="text-black pr-1">Experience:</strong>
                        {data.minimumExperience}
                      </li>
                      <li className="mb-2">
                        <strong className="text-black">Job Location:</strong>{' '}
                        {data.location}
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
