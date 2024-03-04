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
  const [openModal2, setOpenModal2] = useState(false);
  const QuestionInputRef = useRef(null);
  const CustQestionRef = useRef(null);
  const AnswerInputRef = useRef(null);
  const steps = ['Job info', `Custom Q&A`, 'Interview Q&A'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [slectExperience, setSelectExperience] = useState('');
  const [Questionitems, setItems] = useState([]);
  const [CustQuestions, setQuestions] = useState([]);
  // const addItem = (newItem) => {
  //   // setItems((prevItems) => [...prevItems, newItem]);
  //   setItems((prevItems) => [...prevItems, { id: Date.now(), value: newItem }]);
  // };
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

  const addQuestion = (item) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), Question: item.Question, Answer: item.Answer },
    ]);
    console.log(Questionitems);
  };
  const addCustQuestion = (item) => {
    setQuestions((prevItems) => [
      ...prevItems,
      { id: Date.now(), Question: item.Question },
    ]);
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
                  <h1 className="text-white font-weight-bold">Post a Job</h1>
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
                      <h2>Post a Job</h2>
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
                        <div className="form-group w-[100%]">
                          <div className="mb-2 ">
                            <Label
                              htmlFor="Experience"
                              value="Select The years of Experience"
                            />
                          </div>
                          <SelectInput
                            options={[
                              '0-1 years',
                              '1-2 years',
                              '2-3 years',
                              '3-4 years',
                              '4-5 years',
                              '5 or more years',
                            ]}
                            value={slectExperience}
                            onChange={(event) =>
                              setSelectExperience(event.target.value)
                            }
                          />
                        </div>
                        <div className="form-group">
                          <Label
                            htmlFor="job-description"
                            value="Job Requirements"
                          />
                          <Textarea
                            // className="editor"
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
                          <div className="form-group">
                            <div>
                              <div className="mb-2 block">
                                <Label
                                  htmlFor="Answer"
                                  value="Job Description"
                                />
                              </div>
                              <Textarea
                                // id="editor-2"
                                // ref={QuestionInputRef}
                                placeholder="Write Job Description!"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : //condition for step 2
                    currentStep == 2 ? (
                      <>
                        <div className="m-2 p-2">
                          <h3 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                              Better Interview Experience
                            </span>{' '}
                            With AI.
                          </h3>
                          <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                            Create a better interview experience with AI. Add
                            custom questions or use our virtual interview
                            questions to get started.
                          </p>
                        </div>
                        <Button
                          className="m-auto mb-3"
                          onClick={() => {
                            setOpenModal(true);
                            setOpenModal2(false);
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="mr-2"
                            aria-hidden="true"
                          >
                            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                          </svg>
                          Add interview Question
                        </Button>
                        <div
                          className={`flex flex-col-reverse gap-0.5  p-1 mt-2`}
                        >
                          {Questionitems.map((item) => (
                            <Toastitem
                              key={item.id}
                              value={item.Question}
                              className="space-y-4"
                              onAbort={() => {
                                const newItems = Questionitems.filter(
                                  (i) => i.id !== item.id
                                );
                                setItems(newItems);
                              }}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <div className="m-2 p-2">
                            <h3 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                              <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                Custom Questions
                              </span>{' '}
                              in the Application Form.
                            </h3>
                            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                              Add Custom Questions to the job application form.
                            </p>
                          </div>
                          <Button
                            className="m-auto mb-3"
                            onClick={() => {
                              setOpenModal(true);
                              setOpenModal2(true);
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="mr-2"
                              aria-hidden="true"
                            >
                              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                            </svg>
                            Add Custom Question
                          </Button>
                        </div>
                        <div
                          className={`flex flex-col-reverse gap-0.5  p-1 mt-2`}
                        >
                          {CustQuestions.map((item) => (
                            <Toastitem
                              value={item.Question}
                              className="space-y-4"
                              onAbort={() => {
                                const newItems = Questionitems.filter(
                                  (i) => i.id !== item.id
                                );
                                setQuestions(newItems);
                              }}
                            />
                          ))}
                        </div>
                      </>
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
                          <p className="text-gray-500 m-[0.5rem]">{step}</p>
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
                {openModal2
                  ? 'Add New Custom Qestion'
                  : 'Add New Virtual Interview Qestion'}
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
                  {...(openModal2
                    ? { ref: CustQestionRef }
                    : { ref: QuestionInputRef })}
                  placeholder={
                    !openModal2
                      ? `Can you describe a challenging situation you've faced at work and how you handled it?`
                      : 'Tell me about the last project you were involved in ?'
                  }
                  required
                />
              </div>
              {!openModal2 && (
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="Answer"
                      value="Enter the question model Answer"
                    />
                  </div>
                  <Textarea
                    id="Answer"
                    ref={AnswerInputRef}
                    placeholder="In my previous role as a software developer, we were working on a project with a very tight deadline. Halfway through......."
                    required
                  />
                </div>
              )}
              <div className="w-full">
                <Button
                  onClick={() => {
                    if (openModal2) {
                      if (CustQestionRef.current.value != '') {
                        addCustQuestion({
                          Question: CustQestionRef.current.value,
                        });
                        CustQestionRef.current.value = '';
                      }
                    } else {
                      if (QuestionInputRef.current.value != '') {
                        addQuestion({
                          Question: QuestionInputRef.current.value,
                          Answer: QuestionInputRef.current.value,
                        });
                        QuestionInputRef.current.value = '';
                        AnswerInputRef.current.value = '';
                      }
                    }
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="mr-2"
                    aria-hidden="true"
                  >
                    <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                  </svg>
                  Add Question
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </Layout>
  );
}
