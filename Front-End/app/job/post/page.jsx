import Layout from '../../components/Layout';
import Link from 'next/link';
export default function Post_job() {
  return (
    <Layout>
    <>
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
        </div>
        {/* .site-mobile-menu */}
        {/* NAVBAR */}
        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Post A Job</h1>
                <div className="custom-breadcrumbs">
                  <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                  <Link href="#">Job</Link> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Post a Job</strong>
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
                  <div>
                    <h2>Post A Job</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-6">
                    <Link href="#" className="btn btn-block btn-light btn-md">
                      <span className="icon-open_in_new mr-2" />
                      Preview
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link href="#" className="btn btn-block btn-primary btn-md">
                      Save Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-12">
                <form className="p-4 p-md-5 border rounded" method="post">
                  <h3 className="text-black mb-5 border-bottom pb-2">
                    Job Details
                  </h3>
                  <div className="form-group">
                    <label htmlFor="company-website-tw d-block">
                      Upload Featured Image
                    </label>
                    <br />
                    <label className="btn btn-primary btn-md btn-file">
                      Browse File
                      <input type="file" hidden="" />
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="you@yourdomain.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-title">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="job-title"
                      placeholder="Product Designer"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-location">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="job-location"
                      placeholder="e.g. New York"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-region">Job Region</label>
                    <select
                      className="selectpicker border rounded"
                      id="job-region"
                      data-style="btn-black"
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
                  <div className="form-group">
                    <label htmlFor="job-type">Job Type</label>
                    <select
                      className="selectpicker border rounded"
                      id="job-type"
                      data-style="btn-black"
                      data-width="100%"
                      data-live-search="true"
                      title="Select Job Type"
                    >
                      <option>Part Time</option>
                      <option>Full Time</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-description">Job Requirements</label>
                    <div className="editor" id="editor-1">
                      <p>Write Job Requirements!</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="job-description">Job Description</label>
                    <div className="editor" id="editor-2">
                      <p>Write Job Description!</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row align-items-center mb-5">
              <div className="col-lg-4 ml-auto">
                <div className="row">
                  <div className="col-6">
                    <Link href="#" className="btn btn-block btn-light btn-md">
                      <span className="icon-open_in_new mr-2" />
                      Preview
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link href="#" className="btn btn-block btn-primary btn-md">
                      Save Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
    </Layout>
  );
}
