'use client';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { Button, FileInput, Label, Modal, Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import '../../../public/css/stepper.css';
import { TiTick } from 'react-icons/ti';
export default function Post_job() {
  const [openModal, setOpenModal] = useState(false);
  const QuestionInputRef = useRef(null);
  const steps = ['Job info', 'Custom Questions', 'Interview Questions'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  // const [contentNum,setContent] = useState(1);
  return (
    <Layout>
      <>
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
                    <Link href="#">Home</Link>{' '}
                    <span className="mx-2 slash">/</span>
                    <Link href="#">Job</Link>{' '}
                    <span className="mx-2 slash">/</span>
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
                      <Link
                        href="#"
                        className="btn btn-block btn-primary btn-md"
                      >
                        Save Job
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-lg-12">
                  <form className="p-4 p-md-5 border rounded" method="post">
                    {/* condition for step 1 */}
                    {currentStep == 1 ? (
                      <>
                        <h3 className="text-black mb-5 border-bottom pb-2">
                          Job Details
                        </h3>
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
                          <label htmlFor="job-description">
                            Job Requirements
                          </label>
                          <div className="editor" id="editor-1">
                            <p>Write Job Requirements!</p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="job-description">
                            Job Description
                          </label>
                          <div className="editor" id="editor-2">
                            <p>Write Job Description!</p>
                          </div>
                        </div>
                      </>
                    ) : //condition for step 2
                    currentStep == 2 ? (
                      <>
                        <Button onClick={() => setOpenModal(true)}>
                          Add interview Question
                        </Button>
                        <Modal
                          show={openModal}
                          size="lg"
                          popup
                          onClose={() => setOpenModal(false)}
                          initialFocus={QuestionInputRef}
                        >
                          <Modal.Header />
                          <Modal.Body>
                            <div className="space-y-6">
                              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Add New Virtual Interview Qestion
                              </h3>
                              <div>
                                <div className="mb-2 block">
                                  <Label
                                    htmlFor="Question"
                                    value="Enter Application Question"
                                  />
                                </div>
                                <Textarea
                                  id="Question"
                                  ref={QuestionInputRef}
                                  placeholder="How many years of experiance do you have ?"
                                  required
                                />
                              </div>
                              <div>
                                <div className="mb-2 block">
                                  <Label
                                    htmlFor="Answer"
                                    value="Enter the question model Answer"
                                  />
                                </div>
                                <Textarea
                                  id="Answer"
                                  // ref={QuestionInputRef}
                                  placeholder="I have Three years of experiance"
                                  required
                                />
                              </div>
                              {/* <div className="w-full">
                                <Button>Add Question</Button>
                              </div> */}
                            </div>
                          </Modal.Body>
                        </Modal>
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="file-upload" value="Upload file" />
                          </div>
                          <FileInput id="file-upload" />
                        </div>
                      </>
                    ) : (
                      //condition for step 3
                      <div className="form-group"> list 3</div>
                    )}
                    {/* <> */}
                    {/* <Button onClick={() => setOpenModal(true)}>
                        Add interview Question
                      </Button> */}
                    {/* <Modal
                        show={openModal}
                        size="lg"
                        popup
                        onClose={() => setOpenModal(false)}
                        initialFocus={QuestionInputRef}
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                              Add New Virtual Interview Qestion
                            </h3>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="Question"
                                  value="Enter Application Question"
                                />
                              </div>
                              <Textarea
                                id="Question"
                                ref={QuestionInputRef}
                                placeholder="How many years of experiance do you have ?"
                                required
                              />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="Answer"
                                  value="Enter the question model Answer"
                                />
                              </div>
                              <Textarea
                                id="Answer"
                                // ref={QuestionInputRef}
                                placeholder="I have Three years of experiance"
                                required
                              />
                            </div>
                            <div className="w-full">
                              <Button>Add Question</Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal> */}
                    {/* </> */}
                    {/* <div>
                      <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Upload file" />
                      </div>
                      <FileInput id="file-upload" />
                    </div> */}
                  </form>
                  <div className="form-group h-5 m-5  w-full flex flex-row justify-center mb-2 ">
                    <div className="flex justify-between content-center">
                      {steps?.map((step, i) => (
                        <div
                          key={i}
                          className={`step-item ${
                            currentStep === i + 1 && 'active'
                          } ${
                            (i + 1 < currentStep || complete) && 'complete'
                          } `}
                        >
                          <div className="step">
                            {i + 1 < currentStep || complete ? (
                              <TiTick size={24} />
                            ) : (
                              i + 1
                            )}
                          </div>
                          <p className="text-gray-500">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center mb-5">
                <div className="col-lg-4 ml-auto">
                  <div className="row">
                    <div className="col-6">
                      {/* <Link href="#" className="btn btn-block btn-light btn-md">
                        <span className="icon-open_in_new mr-2" />
                        Preview
                      </Link> */}
                      {currentStep!=1 && (
                        <button
                          className="btn btn-block btn-light btn-md"
                          onClick={() => {
                            currentStep !== 0
                              && setCurrentStep((prev) => prev -1 );
                          }}
                        >
                          {currentStep === steps.length ? 'Back' : 'Back'}
                        </button>
                      )}
                    </div>
                    <div className="col-6">
                      {!complete && (
                        <button
                          className="btn btn-block btn-primary btn-md"
                          onClick={() => {
                            currentStep === steps.length
                              ? setComplete(true)
                              : setCurrentStep((prev) => prev + 1);
                          }}
                        >
                          {currentStep === steps.length ? 'Finish' : 'Next'}
                        </button>
                      )}
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
