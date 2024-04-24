import Layout from '../components/Layout';
import Link from 'next/link';
export default function IndexPage() {
  return (
    <>
      <Layout>
        <link
          rel="stylesheet"
          href="/css/features/nicepage.css"
          media="screen"
        />
        <link
          rel="stylesheet"
          href="/css/features/nicepage-site.css"
          media="screen"
        />
        <link rel="stylesheet" href="/css/features/About.css" media="screen" />
        <meta name="generator" content="Nicepage 5.15.1, nicepage.com" />
        <link
          id="u-theme-google-font"
          rel="stylesheet"
          href="/css/features/css.css"
        />
        <link
          id="u-page-google-font"
          rel="stylesheet"
          href="/css/features/css(1).css"
        />
        <section
          className="home-section section-hero overlay bg-image"
          style={{
            backgroundImage:
              'url("/images/ai-background-business-technology-digital-transformation.jpg")',
          }}
          id="home-section"
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="mb-5 text-center">
                  <h1 className="text-white font-weight-bold">
                    The Easiest Way To Get Your Dream Job
                  </h1>
                  <p>
                    Find your dream jobs in our powerful AI-driven platform.
                  </p>
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
                        data-live-search="true"
                        title="Select Region"
                      >
                        <option>Anywhere</option>
                        <option>San Francisco</option>
                        <option>Palo Alto</option>
                        <option>New York</option>
                        <option>Manhattan</option>
                        <option>Ontario</option>
                        <option>Toronto</option>
                        <option>Kansas</option>
                        <option>Mountain View</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                      <select
                        className="selectpicker"
                        data-style="btn-white btn-lg"
                        data-width="100%"
                        data-live-search="true"
                        title="Select Job Type"
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
                          <a href="#" className="m-0.5">
                            UI Designer
                          </a>
                        </li>
                        <li>
                          <a href="#" className="m-0.5">
                            Python
                          </a>
                        </li>
                        <li>
                          <a href="#" className="m-0.5">
                            Developer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <a href="#next" className="scroll-button smoothscroll">
            <span className=" icon-keyboard_arrow_down" />
          </a>
        </section>
        <section
          className="py-5 bg-image overlay-primary fixed overlay"
          id="next"
          style={{
            backgroundImage:
              'url("/images/ai-background-business-technology-digital-transformation.jpg")',
          }}
        >
          <div className="container">
            <div className="row mb-5 justify-content-center">
              <div className="col-md-7 text-center">
                <h2 className="section-title mb-2 text-white">
                  JobBoard Site Stats
                </h2>
                <p className="lead text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita unde officiis recusandae sequi excepturi corrupti.
                </p>
              </div>
            </div>
            <div className="row pb-0 block__19738 section-counter">
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={1930}>
                    0
                  </strong>
                </div>
                <span className="caption">Candidates</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={54}>
                    0
                  </strong>
                </div>
                <span className="caption">Jobs Posted</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={120}>
                    0
                  </strong>
                </div>
                <span className="caption">Jobs Filled</span>
              </div>
              <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <strong className="number" data-number={550}>
                    0
                  </strong>
                </div>
                <span className="caption">Companies</span>
              </div>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="container">
            <section
              className="u-align-center u-clearfix u-white u-section-1"
              id="carousel_c99c"
            >
              <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <h2 className="feature-head"> features</h2>
                <div className="u-expanded-width u-layout-grid u-list u-list-1">
                  <div className="u-repeater u-repeater-1">
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-list-item-1 feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                        <div className="feat-">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="black"
                            className="bi bi-list-ol feat"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"
                            />
                            <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                          </svg>
                        </div>
                        <h4 className="feat-title">Consistency</h4>
                        <p className="u-text u-text-3">
                          AI ensures a consistent interview experience for
                          candidates by asking the same questions in the same
                          manner, eliminating variations that may occur with
                          human interviewers.
                        </p>
                      </div>
                    </div>
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-video-cover feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                        <div className="feat-">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill=" black"
                            className="bi bi-speedometer2 feat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                            <path
                              fillRule="evenodd"
                              d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"
                            />
                          </svg>
                        </div>
                        <h4 className="feat-title">Efficiency</h4>
                        <p className="u-text u-text-5">
                          {' '}
                          AI can quickly analyze candidate responses and provide
                          immediate feedback or scoring, saving time and
                          resources for both recruiters and candidates.
                        </p>
                      </div>
                    </div>
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-video-cover feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                        <div className="feat-">
                          {' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="black"
                            className="bi bi-diagram-3 feat"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
                            />
                          </svg>
                        </div>
                        <h4 className="feat-title">Scalability</h4>
                        <p className="u-text u-text-7">
                          AI can handle multiple interviews simultaneously,
                          making it suitable for large-scale recruitment
                          processes without compromising quality.
                        </p>
                      </div>
                    </div>
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-video-cover feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-4">
                        <div className="feat-">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="black"
                            className="bi bi-clock feat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                          </svg>
                        </div>
                        <h4 className="feat-title">24/7 Availability</h4>
                        <p className="u-text u-text-9">
                          AI can conduct interviews at any time, ensuring
                          accessibility and flexibility for both candidates and
                          recruiters.
                        </p>
                      </div>
                    </div>
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-video-cover feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-5">
                        <div className="feat-">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="black"
                            className="bi bi-cash-coin feat"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                            />
                            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                          </svg>
                        </div>
                        <h4 className="feat-title">Cost-Effectiveness</h4>
                        <p className="u-text u-text-11">
                          {' '}
                          AI-driven interviews reduce the need for human
                          interviewers, leading to cost savings in recruitment
                          resources and time.
                        </p>
                      </div>
                    </div>
                    <div className="u-align-left u-container-style u-list-item u-palette-1-base u-radius-20 u-repeater-item u-shape-round u-video-cover feat-hov">
                      <div className="u-container-layout u-similar-container u-valign-top u-container-layout-6">
                        <div className="feat-">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={80}
                            height={80}
                            fill="black"
                            className="bi bi-emoji-smile feat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                          </svg>
                        </div>
                        <h4 className="feat-title">
                          Improved Candidate Experience
                        </h4>
                        <p className="u-text u-text-13">
                          AI interviews offer a streamlined and convenient
                          experience for candidates, with quick feedback and a
                          user-friendly interface.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
        <section className="site-section py-4">
          <div className="container"></div>
        </section>
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
                        Porro error reiciendis commodi beatae omnis similique
                        voluptate rerum ipsam fugit mollitia ipsum facilis
                        expedita tempora suscipit iste
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
          <section className="bg-light pt-5 testimony-full">
            <div className="owl-carousel single-carousel">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 align-self-center text-center text-lg-left">
                    <blockquote>
                      <p>“suiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.”</p>
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
