import Layout from '../components/Layout';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import { Features, Testimonial } from '../components/components';
export default function IndexPage() {
  return (
    <>
      <Layout>
        <div className="bg-white">
          <section className="bg-[#FCF8F1] bg-opacity-30  ">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-xl lg:text-2xl">
                    Welcome to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      Intelliview
                    </span>
                  </p>
                  {/* <p className="tracking-tighter text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Welcome to Intelliview
                  </p> */}
                  <h1 className=" tracking-tighter font-icomoon mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                    The Easiest &amp; Way To Get Your Dream Job
                  </h1>

                  <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl tracking-tighter">
                    Find your dream jobs in our powerful AI-driven platform.
                  </p>
                  <div className="flex flex-row space-x-3">
                    <a
                      href="/login"
                      title=""
                      className="inline-flex items-center px-4 py-3  mt-8 font-semibold text-white transition-all duration-200 bg-black rounded-full lg:mt-16 hover:bg-black focus:bg-black"
                      role="button"
                    >
                      Practise mocks Now
                      <svg
                        className="w-6 h-6 ml-8 -mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </a>
                    <a
                      href="/login"
                      title=""
                      className="inline-flex items-center px-4 py-3 mt-8 font-semibold text-dark transition-all duration-200 bg-white rounded-full lg:mt-16 hover:bg-white focus:bg-white"
                      role="button"
                    >
                      Sign as a company
                      <svg
                        className="w-6 h-6 ml-8 -mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </a>
                  </div>

                  <p className="mt-5 text-gray-600">
                    Already joined us?{' '}
                    <a
                      href="/login"
                      title=""
                      className="text-black transition-all duration-200 hover:underline"
                    >
                      Log in
                    </a>
                  </p>
                </div>
                <div>
                  <img
                    className="w-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="py-10 bg-white sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <h4 className="text-xl font-medium text-gray-900">
                Numbers tell the hard works we’ve done in last 6 years
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-6 px-6 mt-8 sm:px-0 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
              <div className="overflow-hidden bg-white rounded-lg">
                <div className="px-4 py-6">
                  <div className="flex items-start">
                    <svg
                      className="flex-shrink-0 w-12 h-12 text-cyan-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h4 className="text-4xl font-bold text-gray-900">6+</h4>
                      <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                        Years in business
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg">
                <div className="px-4 py-6">
                  <div className="flex items-start">
                    <svg
                      className="flex-shrink-0 w-12 h-12 text-cyan-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h4 className="text-4xl font-bold text-gray-900">37+</h4>
                      <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                        Team members
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg">
                <div className="px-4 py-6">
                  <div className="flex items-start">
                    <svg
                      className="flex-shrink-0 w-12 h-12 text-cyan-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h4 className="text-4xl font-bold text-gray-900">
                        3,274
                      </h4>
                      <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                        Projects delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg">
                <div className="px-4 py-6">
                  <div className="flex items-start">
                    <svg
                      className="flex-shrink-0 w-12 h-12 text-cyan-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <div className="ml-4">
                      <h4 className="text-4xl font-bold text-gray-900">98%</h4>
                      <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                        Customer success
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />
        {/* ====== Call To Action Section Start */}
        <section className="w-full py-0 lg:py-[120px] bg-white dark:bg-dark">
          <div className=" mx-auto">
            <div className="relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 lg:w-1/2">
                  <span className="block mb-4 text-base font-medium text-white">
                    Find Your Next Dream Job
                  </span>
                  <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                    <span className="xs:block"> Get started with </span>
                    <span>our free trial</span>
                  </h2>
                </div>
                <div className="w-full px-4 lg:w-1/2">
                  <div className="flex flex-wrap lg:justify-end">
                    <a
                      href="#"
                      className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-shadow-1 text-primary px-7"
                    >
                      Get Pro Version
                    </a>
                    <a
                      href="#"
                      className="inline-flex py-3 my-1 text-base font-medium text-white transition rounded-md btn btn-dark btn-md border-width-2 mx-1 px-7 hover:bg-opacity-90"
                    >
                      Start Free Trial
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <span className="absolute top-0 left-0 z-[-1]">
                  <svg
                    width={189}
                    height={162}
                    viewBox="0 0 189 162"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx={16}
                      cy="-16.5"
                      rx={173}
                      ry="178.5"
                      transform="rotate(180 16 -16.5)"
                      fill="url(#paint0_linear)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1={-157}
                        y1="-107.754"
                        x2="98.5011"
                        y2="-106.425"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0.07" />
                        <stop offset={1} stopColor="white" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="absolute bottom-0 right-0 z-[-1]">
                  <svg
                    width={191}
                    height={208}
                    viewBox="0 0 191 208"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx={173}
                      cy="178.5"
                      rx={173}
                      ry="178.5"
                      fill="url(#paint0_linear)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="-3.27832e-05"
                        y1="87.2457"
                        x2="255.501"
                        y2="88.5747"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0.07" />
                        <stop offset={1} stopColor="white" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* ====== Call To Action Section End */}
        <>
          <section className="site-section py-4">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 text-center mt-4 mb-5">
                  <div className="row justify-content-center">
                    <div className="col-md-7">
                      <h2 className="section-title mb-2">
                        Company We've Helped
                      </h2>
                      <p className="lead">
                        Porro error reiciendis commodi beatae omnipy-5 bg-image
                        overlay-primary fixed overlays similique voluptate rerum
                        ipsam fugit mollitia ipsum facilis expedita tempora
                        suscipit iste
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_mailchimp.svg"
                    alt="Image"
                    className="img-fluid logo-1"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_paypal.svg"
                    alt="Image"
                    className="img-fluid logo-2"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_stripe.svg"
                    alt="Image"
                    className="img-fluid logo-3"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_visa.svg"
                    alt="Image"
                    className="img-fluid logo-4"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_apple.svg"
                    alt="Image"
                    className="img-fluid logo-5"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_tinder.svg"
                    alt="Image"
                    className="img-fluid logo-6"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_sony.svg"
                    alt="Image"
                    className="img-fluid logo-7"
                  />
                </div>
                <div className="col-6 col-lg-3 col-md-6 text-center">
                  <img
                    src="/images/logo_airbnb.svg"
                    alt="Image"
                    className="img-fluid logo-8"
                  />
                </div>
              </div>
            </div>
          </section>
          <Testimonial />
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
                      className="btn btn-dark btn-md px-4 border-width-2 mx-1"
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
                    alt="Free Website Template by Free-Template.co"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      </Layout>
    </>
  );
}
