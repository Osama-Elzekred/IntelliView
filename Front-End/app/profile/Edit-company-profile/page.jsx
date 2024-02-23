import Layout from '../../components/Layout';
import Phone from '../../components/Phone';

export default function Edit_profile() {
  return (
    <Layout>
      <link rel="stylesheet" href="/css/edit-profile.css" />

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
        {/* NAVBAR */}
        <header className="site-navbar mt-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="site-logo col-6">
                <a href="index.html">intelliview</a>
              </div>
              <nav className="mx-auto site-navigation">
                <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                  <li>
                    <a href="index.html" className="nav-link">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li className="has-children">
                    <a href="job-listings.html">Job Listings</a>
                    <ul className="dropdown">
                      <li>
                        <a href="job-single.html">Job Single</a>
                      </li>
                      <li>
                        <a href="post-job.html">Post a Job</a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <a href="services.html">Pages</a>
                    <ul className="dropdown">
                      <li>
                        <a href="services.html">Services</a>
                      </li>
                      <li>
                        <a href="service-single.html">Service Single</a>
                      </li>
                      <li>
                        <a href="blog-single.html">Blog Single</a>
                      </li>
                      <li>
                        <a href="portfolio.html">Portfolio</a>
                      </li>
                      <li>
                        <a href="portfolio-single.html">Portfolio Single</a>
                      </li>
                      <li>
                        <a href="testimonials.html">Testimonials</a>
                      </li>
                      <li>
                        <a href="faq.html">Frequently Ask Questions</a>
                      </li>
                      <li>
                        <a href="gallery.html">Gallery</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                  <li className="d-lg-none">
                    <a href="post-job.html">
                      <span className="mr-2">+</span> Post a Job
                    </a>
                  </li>
                  <li className="d-lg-none">
                    <a href="login.html">Log In</a>
                  </li>
                </ul>
              </nav>
              <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
                <div className="ml-auto">
                  <a
                    href="post-job.html"
                    className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                  >
                    <span className="mr-2 icon-add" />
                    Post a Job
                  </a>
                  <a
                    href="login.html"
                    className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                  >
                    <span className="mr-2 icon-lock_outline" />
                    Log In
                  </a>
                </div>
                <a
                  href="#"
                  className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
                >
                  <span className="icon-menu h3 m-0 p-0 mt-2" />
                </a>
              </div>
            </div>
          </div>
        </header>
        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{
            backgroundImage:
              'url("/images/ai-background-business-technology-digital-transformation.jpg")',
          }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Edit Profile</h1>
                <div className="custom-breadcrumbs">
                  <a href="#">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Edit Peofile</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container light-style flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <a
                    className="list-group-item list-group-item-action active"
                    data-toggle="list"
                    href="#account-general"
                  >
                    General
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-change-password"
                  >
                    Change password
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-info"
                  >
                    Info
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-social-links"
                  >
                    Social links
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-connections"
                  >
                    Connections
                  </a>
                  <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-notifications"
                  >
                    Notifications
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade active show"
                    id="account-general"
                  >
                    <div className="card-body media align-items-center">
                      <img
                        src="/images/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                        alt=""
                        className="d-block ui-w-80"
                      />
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input
                            type="file"
                            className="account-settings-fileinput"
                          />
                        </label>{' '}
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-default md-btn-flat"
                        >
                          Reset
                        </button>
                        <div className="text-light small mt-1">
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </div>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <form className="Company">
                        <div className="form-company">
                          <div className="name-type">
                            <div className="company-name">
                              <label htmlFor="company-name">name</label>
                              <br />
                              <input id="company-name" type="text" />
                            </div>
                            <div className="type_">
                              <label htmlFor="type_">type</label>
                              <br />
                              <input type="text" id="type_" />
                            </div>
                          </div>
                          <div className="overview">
                            <label htmlFor="overview">overview</label>
                            <br />
                            <textarea className="overview_" defaultValue={''} />
                          </div>
                          <div className="website_">
                            <label htmlFor="website_">Website</label>
                            <br />
                            <input type="text" id="website_" />
                          </div>
                          {/* <div className="phone-company"> */}
                          <label htmlFor="phone">phone number</label>
                          <br />
                          <Phone />
                          {/* </div> */}
                          <div className="size-founded">
                            <div className="size_">
                              <label htmlFor="size_">size</label>
                              <br />
                              <input type="text" id="size_" />
                            </div>
                            <div className="founded_">
                              <label htmlFor="founded_">founded</label>
                              <br />
                              <input type="month" id="founded_" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group-">
                        <label className="form-label-">Current password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group-">
                        <label className="form-label">New password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">
                          Repeat new password
                        </label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-info">
                    <div className="card-body pb-2">
                      <div className="form-group-">
                        <label className="form-label-">Bio</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          defaultValue={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.'
                          }
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Birthday</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="May 3, 1995"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Country</label>
                        <select className="custom-select">
                          <option>USA</option>
                          <option selected="">Canada</option>
                          <option>UK</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Contacts</h6>
                      <div className="form-group-">
                        <label className="form-label-">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="+0 (123) 456 7891"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Website</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-social-links">
                    <div className="card-body pb-2">
                      <div className="form-group-">
                        <label className="form-label-">Twitter</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://twitter.com/user"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Facebook</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://www.facebook.com/user"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Google+</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">LinkedIn</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Instagram</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://www.instagram.com/user"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-connections">
                    <div className="card-body">
                      <button type="button" className="btn btn-twitter">
                        Connect to <strong>Twitter</strong>
                      </button>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <h5 className="mb-2">
                        <a
                          href="javascript:void(0)"
                          className="float-right text-muted text-tiny"
                        >
                          <i className="ion ion-md-close" /> Remove
                        </a>
                        <i className="ion ion-logo-google text-google" />
                        You are connected to Google:
                      </h5>
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="523c3f332a25373e3e123f333b3e7c313d3f"
                      >
                        [email&nbsp;protected]
                      </a>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <button type="button" className="btn btn-facebook">
                        Connect to <strong>Facebook</strong>
                      </button>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <button type="button" className="btn btn-instagram">
                        Connect to <strong>Instagram</strong>
                      </button>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-notifications">
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Activity</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone comments on my article
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone answers on my forum thread
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone follows me
                          </span>
                        </label>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Application</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            News and announcements
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Weekly product updates
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Weekly blog digest
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-3">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            &nbsp;
            <button type="button" className="btn btn-default">
              Cancel
            </button>
          </div>
        </div>
        <footer className="site-footer">
          <a href="#top" className="smoothscroll scroll-top">
            <span className="icon-keyboard_arrow_up" />
          </a>
          <div className="container">
            <div className="row mb-5">
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Search Trending</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <a href="#">Graphic Design</a>
                  </li>
                  <li>
                    <a href="#">Web Developers</a>
                  </li>
                  <li>
                    <a href="#">Python</a>
                  </li>
                  <li>
                    <a href="#">HTML5</a>
                  </li>
                  <li>
                    <a href="#">CSS3</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Company</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Resources</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Support</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Contact Us</h3>
                <div className="footer-social">
                  <a href="#">
                    <span className="icon-facebook" />
                  </a>
                  <a href="#">
                    <span className="icon-twitter" />
                  </a>
                  <a href="#">
                    <span className="icon-instagram" />
                  </a>
                  <a href="#">
                    <span className="icon-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

    </Layout>
  );
}
