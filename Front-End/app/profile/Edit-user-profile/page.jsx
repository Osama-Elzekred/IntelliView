import Layout from '../../components/Layout';
import Phone from '../../components/Phone';
import Script from 'next/script';
const User_profile = () => {
  return (
    <Layout>
      <>
        <link rel="stylesheet" href="/css/edit-profile.css" />
        <div id="overlayer" />
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="site-wrap" id="top">
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
                          id="profileImage"
                        />
                        <div className="media-body ml-4">
                          <label
                            className="btn btn-outline-primary"
                            htmlFor="inputFile"
                          >
                            Upload new photo
                          </label>{' '}
                          &nbsp;
                          <input
                            type="file"
                            className="account-settings-fileinput"
                            id="inputFile"
                          />
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
                        <form className="user" id="userForm">
                          <div className="form_">
                            <div className="name">
                              <div className="first_name">
                                <label htmlFor="first">First name</label>
                                <br />
                                <input
                                  id="firstName"
                                  type="text"
                                  name="firstName"
                                />
                              </div>
                              <div className="last_name">
                                <label htmlFor="last">last name</label>
                                <br />
                                <input
                                  id="lastName"
                                  type="text"
                                  name="lastName"
                                />
                              </div>
                            </div>
                            <div className="cv">
                              <label htmlFor="inputFile">cv</label>
                              <br />
                              <div
                                className="cssbuttons-io-button"
                                id="uploadCv"
                              >
                                <svg
                                  viewBox="0 0 640 512"
                                  fill="white"
                                  height="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                                </svg>
                                <input
                                  type="file"
                                  name="cv"
                                  id="CVfile"
                                  // htmlFor="inputFile"
                                  style={{ display: 'none' }}
                                />
                                <label className="" htmlFor="CVfile">
                                  Upload your CV
                                </label>
                              </div>
                            </div>
                            <div className="title">
                              <label htmlFor="title">title</label>
                              <br />
                              <input type="text" id="title" name="title" />
                            </div>
                            <div className="phone">
                              <label htmlFor="phone">phone number</label>
                              <br />
                              <Phone />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="account-change-password">
                      <div className="card-body pb-2">
                        <div className="form-group-">
                          <label className="form-label-">
                            Current password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="oldPassword"
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label">New password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label-">
                            Repeat new password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPasswordConfirm"
                          />
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
                    <div id="message" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-3">
              <button
                type="button"
                className="btn btn-primary"
                id="saveChanges"
              >
                Save changes
              </button>
              &nbsp;
              <button type="button" className="btn btn-default">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <Script src="/js/profile.js"></Script>
      </>
    </Layout>
  );
};
export default User_profile;
