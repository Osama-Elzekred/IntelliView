'use client';
import Layout from '../../components/Layout';
import Toastitem from '../../components/Toast';

import Link from 'next/link';
import { Button, FileInput, Label, Modal, Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import '../../../public/css/stepper.css';
import { TiTick } from 'react-icons/ti';
import { SelectInput } from '../../components/SelectInput';

export default function Post_job() {
  const [openModal, setOpenModal] = useState(false);
  const QuestionInputRef = useRef(null);
  const steps = ['Job info', 'Custom Questions', 'Interview Questions'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [Questionitems, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  // const handleCountryChange = (event) => {
  //   setSelectedCountry(event.target.value);
  // };
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addQuestion = (newQuestion) => {
    setItems((prevItems) => [...prevItems, newQuestion]);
  };
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
                        <div className="flex justify-between">
                          <div className="form-group w-1/2 pr-2">
                            <div className="mb-2 w-[100%]">
                              <Label htmlFor="job-region" value="Job Region" />
                            </div>
                            <SelectInput
                              options={[
                                'Anywhere',
                                'San Francisco',
                                'Palo Alto',
                                'New York',
                                'Manhattan',
                                'Ontario',
                                'Toronto',
                                'Kansas',
                                'Mountain View',
                              ]}
                              value={selectedRegion} // Replace with your actual state variable
                              onChange={(even) =>
                                setSelectedRegion(event.target.value)
                              } // Replace with your actual handler function
                            />
                          </div>
                          <div className="form-group w-1/2">
                            <div className="mb-2 block ">
                              <Label
                                htmlFor="job-type"
                                value="Select The Job Type"
                              />
                            </div>
                            <SelectInput
                              options={[
                                'Part Time',
                                'Full Time',
                                'Contract',
                                'Internship',
                                'Temporary',
                                'Freelance',
                              ]}
                              value={selectedCountry}
                              onChange={(event) =>
                                setSelectedCountry(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <Label
                            htmlFor="job-description"
                            value="Job Requirements"
                          />
                          <Textarea
                            className="editor"
                            // id="editor-1"
                            placeholder="Job Requirements"
                            value={description}
                            onChange={handleDescriptionChange} // Replace with your actual handler function
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="Answer" value="Job Description" />
                            </div>
                            <Textarea
                              // id="editor-2"
                              // ref={QuestionInputRef}
                              placeholder="Write Job Description!"
                              required
                            />
                          </div>
                        </div>
                      </>
                    ) : //condition for step 2
                    currentStep == 2 ? (
                      <>
                        <Button
                          className="m-auto mb-3"
                          onClick={() => setOpenModal(true)}
                        >
                          Add interview Question
                        </Button>
                        <div
                          className={`flex flex-col-reverse gap-0.5  p-1 mt-2`}
                        >
                          {Questionitems.map((item, index) => (
                            <Toastitem
                              key={index}
                              value={item}
                              className="space-y-4"
                              onAbort={() => {
                                const newItems = [...Questionitems];
                                newItems.splice(index, 1);
                                setItems(newItems);
                              }}
                            />
                          ))}
                        </div>
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
                              <div className="w-full">
                                <Button
                                  onClick={() => {
                                    if (QuestionInputRef.current.value != '') {
                                      addQuestion(
                                        QuestionInputRef.current.value
                                      );
                                      QuestionInputRef.current.value = '';
                                    }
                                  }}
                                >
                                  Add Question
                                </Button>
                              </div>
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
                  </form>
                  <div className="form-group h-5 m-5 flex flex-row justify-center ql-align-center text-center mb-2 ">
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
                      {currentStep !== 1 && (
                        <button
                          className={`btn btn-block btn-light btn-md`}
                          onClick={() => {
                            if (currentStep !== 0) {
                              setCurrentStep((prev) => prev - 1);
                            }
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                        >
                          {currentStep === steps.length ? 'Back' : 'Back'}
                        </button>
                      )}
                    </div>
                    <div className="col-6">
                      {!complete && (
                        <button
                          className={`btn btn-block  ${
                            currentStep !== steps.length
                              ? 'btn-primary'
                              : 'btn-dark'
                          } btn-primary btn-md ${
                            currentStep > steps.length && 'disabled'
                          }`}
                          onClick={() => {
                            currentStep !== steps.length;
                            // ? setComplete(true) :
                            setCurrentStep((prev) => prev + 1);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
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
