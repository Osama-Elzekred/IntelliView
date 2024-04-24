'use client';
import Link from 'next/link';
import { Button, Label, Modal, Textarea, Datepicker } from 'flowbite-react';
import { useRef, useState,useEffect } from 'react';
import '../../../public/css/stepper.css';
import { TiTick } from 'react-icons/ti';
import {
  SelectInput,
  SelectMulti,
  Toastitem,
  Layout,
} from '../../components/components';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import Loading from '../../components/loading';

export default function Post_job(JobId) {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const QuestionInputRef = useRef(null);
  const CustQestionRef = useRef(null);
  const AnswerInputRef = useRef(null);
  const steps = ['Job info', `Custom Q&A`, 'Interview Q&A'];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [Questionitems, setItems] = useState([]);
  const [CustQuestions, setQuestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const authTokenCookie = Cookies.get('authToken');
  const role = Cookies.get('role');
  const [loading, setLoading] = useState(true);
  if (!authTokenCookie || role != 'company') {
    redirect('/');
  }
  const categories = [
    'Data Structures & Algorithms',
    'C/C++',
    'Git',
    'HTML/CSS',
    'Python',
    'MATLAB',
    'Adobe Creative Suite',
    'Adobe Illustrator',
    'Adobe Photoshop',
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Submit Form
  const [jobInfo, setJobInfo] = useState({
    Email: '',
    JobTitle: '',
    Location: '',
    JobType: 'on-site',
    JobTime: 'Part Time',
    Experiance: '0-1 years',
    EndDate: '',
    JobRequirements: '',
    JobDescription: '',
    Questionitems: [],
    CustQuestions: [],
    categories: [],
  });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7049/api/job/CompanyJob/${JobId}`,
          {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokenCookie}`,
            },
          }
        );

        if (!response.ok) {
          console.error('Failed to fetch job data');
          return;
        }

        const data = await response.json();

        // Update jobInfo state with the fetched data
        setJobInfo({
          Title: data.Title,
          JobType: data.JobType,
          JobTime: data.JobTime,
          Location: data.Location,
          MinimumExperience: data.MinimumExperience,
          Description: data.Description,
          Requirements: data.Requirements,
          // Add other mappings...
          // Add arrays to the state
          Questionitems: data.Questionitems,
          CustQuestions: data.CustQuestions,
          JobInterestedTopics: data.JobInterestedTopics,
          EndDate: data.EndDate,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch job data', error);
      }
    };
    if (JobId) fetchJobData();
  }, []);

  const handleDateChange = (date) => {
    const dateString = new Date(date).toLocaleDateString();
    setSelectedDate(dateString);
  };
  const addQuestion = (item) => {
    setItems((prevItems) => {
      const l = [
        ...prevItems,
        {
          id: (Date.now() / 1000) | 0,
          Question: item.Question,
          Answer: item.Answer,
        },
      ];
      return l;
    });
  };
  const addCustQuestion = (item) => {
    setQuestions((prevItems) => {
      const l = [
        ...prevItems,
        { id: (Date.now() / 1000) | 0, Question: item.Question },
      ];

      return l;
    });
  };

  function handleSelectCategory(category) {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories.includes(category)) {
        return [...prevCategories, category];
      }
      return prevCategories;
    });
  }

  function handleDeselectCategory(category) {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((c) => c !== category)
    );
  }

  function handleRemoveLastCategory() {
    setSelectedCategories((prevCategories) =>
      prevCategories.slice(0, prevCategories.length - 1)
    );
  }
  function handleClose() {
    setShowComponent(false);
  }

  const handleChange = (event) => {
    const value = event.target ? event.target.value : event;
    const name = event.target ? event.target.name : event;

    setJobInfo({
      ...jobInfo,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});
  const [authToken, setAuthToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    let errors = {};
    if (!jobInfo.Email) errors.Email = 'Email is required';
    if (!jobInfo.JobTitle) errors.JobTitle = 'Job Title is required';
    if (!jobInfo.Location) errors.Location = 'Location is required';
    if (!jobInfo.JobType) errors.JobType = 'Job Type is required';
    if (!jobInfo.JobTime) errors.JobTime = 'Job Time is required';
    if (!jobInfo.Experiance) errors.Experiance = 'Experience is required';
    if (!jobInfo.EndDate) errors.EndDate = 'End Date is required';
    if (!jobInfo.JobRequirements)
      errors.JobRequirements = 'Job Requirements are required';
    if (!jobInfo.JobDescription)
      errors.JobDescription = 'Job Description is required';
    if (!jobInfo.Questionitems || jobInfo.Questionitems.length === 0)
      errors.Questionitems = 'Question items are required';
    if (!jobInfo.CustQuestions || jobInfo.CustQuestions.length === 0)
      errors.CustQuestions = 'Custom Questions are required';
    if (!jobInfo.categories || jobInfo.categories.length === 0)
      errors.categories = 'Categories are required';

    // if (Object.keys(errors).length > 0) {
    //   // If there are errors, update the state and stop form submission
    //   setErrors(errors);
    //   console.log(errors);
    //   return;
    // }
    let idCounter = 0;
    const addJobDto = {
      Title: jobInfo.JobTitle,
      JobType: jobInfo.JobType,
      JobTime: jobInfo.JobTime,
      Location: jobInfo.Location,
      MinimumExperience: jobInfo.Experiance,
      Description: jobInfo.JobDescription,
      Requirements: jobInfo.JobRequirements,
      // Add other mappings...
      // Add arrays to the DTO
      Questionitems: Questionitems,
      CustQuestions: CustQuestions,
      JobInterestedTopics: selectedCategories.map((category) => ({
        InterestedTopicId: idCounter++, // or some other method to generate unique ID
        Topic: category,
      })),
      EndDate: selectedDate,
    };

    const authTokenCookie = Cookies.get('authToken');
    if (!authTokenCookie) window.location.href = `/unauthorized`;
    // console.log(Cookies.get('authToken'));
    // Submit the form data
    try {
      const response = await fetch(`https://localhost:7049/api/job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokenCookie}`,
        },
        body: JSON.stringify(addJobDto),
      });
      if (!response.ok) {
        console.error('Failed to submit form');
        return;
      }

      const data = await response.json();
      const jobId = data.id;
      window.location.href = `/job/${jobId}`;
      setLoading(false);
    } catch (error) {
      console.error('Failed to submit the form', error);
    }
  };
  const handleEditPost = async (event) => {
    event.preventDefault();

    const authTokenCookie = Cookies.get('authToken');
    if (!authTokenCookie) window.location.href = `/unauthorized`;

    const addJobDto = {
      // Map jobInfo state to DTO
      // ...
    };

    try {
      const response = await fetch(`https://localhost:7049/api/job/${JobId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokenCookie}`,
        },
        body: JSON.stringify(addJobDto),
      });

      if (!response.ok) {
        console.error('Failed to submit form');
        return;
      }

      const data = await response.json();
      setLoading(false);
    } catch (error) {
      console.error('Failed to submit the form', error);
    }
  };

  // if (loading) {
  //   return <Loading />; // Display loading indicator while data is being fetched
  // }

  return (
    <>
      {/* <ProtectedPage allowedRoles={['company']} /> */}
      <Layout>
        <>
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
                      <Link href="/Home">Home</Link>{' '}
                      <span className="mx-2 slash">/</span>
                      <Link href="/job">Job</Link>{' '}
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
                        <Link
                          href="#"
                          className="btn btn-block btn-light btn-md"
                        >
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
                    <form
                      className="p-4 p-md-5 border rounded"
                      method="post"
                      onSubmit={handleSubmit}
                    >
                      {/* condition for step 1 */}
                      {currentStep == 1 ? (
                        <>
                          <h3 className="text-black mb-5 border-bottom pb-2">
                            Job Details
                          </h3>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="Email"
                              value={jobInfo.Email}
                              onChange={(e) => handleChange(e)}
                              placeholder="you@yourdomain.com"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="job-title">Job Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="job-title"
                              name="JobTitle"
                              value={jobInfo.JobTitle}
                              onChange={handleChange}
                              placeholder="Product Designer"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="job-location">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              id="job-location"
                              name="Location"
                              value={jobInfo.Location}
                              onChange={handleChange}
                              placeholder="e.g. New York"
                              required
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="form-group w-1/2 pr-2">
                              <div className="mb-2 w-[100%]">
                                <Label htmlFor="job-type" value="Job Type" />
                              </div>
                              <SelectInput
                                options={['on-site', 'remote', 'hybrid']}
                                name="JobType"
                                value={jobInfo.JobType}
                                onChange={handleChange}
                                // defaultValue="choose a job type"
                              />
                            </div>
                            <div className="form-group w-1/2 pr-2">
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
                                name="JobTime"
                                value={jobInfo.JobTime}
                                onChange={handleChange}
                                // defaultValue="choose a job time"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="form-group w-1/2">
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
                                name="Experiance"
                                value={jobInfo.Experiance}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group w-1/2 pr-2 mx-3 ">
                              <div className="mb-2 ">
                                <Label
                                  htmlFor="EndDate"
                                  value="End Date of Applications"
                                />
                              </div>
                              <Datepicker
                                name="EndDate"
                                value={selectedDate}
                                onSelectedDateChanged={(date) =>
                                  handleDateChange(date)
                                }
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <div className="form-group w-1/3 pr-2 mx-3 items-start ">
                              <div className="mb-2 ">
                                <Label
                                  htmlFor="Categories"
                                  value="Select The Categories"
                                />
                              </div>
                              <Button
                                className="m-auto  "
                                onClick={() => setShowComponent(true)}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="mr-2"
                                  aria-hidden="true"
                                >
                                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                                </svg>
                                Add Categories
                              </Button>
                            </div>
                            <div className="justify-start items-center gap-3 m-4">
                              {selectedCategories.map((category) => (
                                <button
                                  key={category}
                                  className="bg-[#17a9c3] text-white rounded-full px-2 py-1 m-1 text-sm focus:outline-none "
                                  onClick={() =>
                                    handleDeselectCategory(category)
                                  }
                                >
                                  {category}
                                  <span className="text-dark ml-2">
                                    &times;
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="form-group">
                            <Label
                              htmlFor="job-description"
                              value="Job Requirements"
                            />
                            <Textarea
                              placeholder="Job Requirements"
                              name="JobRequirements"
                              value={jobInfo.JobRequirements}
                              onChange={handleChange} // Replace with your actual handler function
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
                                id="job-description"
                                name="JobDescription"
                                value={jobInfo.JobDescription}
                                onChange={handleChange}
                                placeholder="Write Job Description!"
                                required
                              />
                            </div>
                          </div>
                        </>
                      ) : //condition for step 2
                      currentStep == 2 ? (
                        <>
                          <div className="m-2 p-2">
                            <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                Better Interview Experience
                              </span>{' '}
                              With AI.
                            </h3>
                            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
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
                              className="mr-2"
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
                              <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                  Custom Questions
                                </span>{' '}
                                in the Application Form.
                              </h3>
                              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                                Add Custom Questions to the job application
                                form.
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
                                className="mr-2"
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
                                key={item.id}
                                value={item.Question}
                                className="space-y-4"
                                onAbort={() => {
                                  const newItems = CustQuestions.filter(
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
                            onClick={(event) => {
                              currentStep === steps.length
                                ? handleSubmit(event)
                                : setCurrentStep((prev) => prev + 1);
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
            show={showComponent}
            size="sm"
            popup
            onClose={() => setShowComponent(false)}
            // initialFocus={}
          >
            <SelectMulti
              categories={categories}
              selectedCategories={selectedCategories}
              onSelectCategory={handleSelectCategory}
              onDeselectCategory={handleDeselectCategory}
              onRemoveLast={handleRemoveLastCategory}
              onClose={handleClose}
            />
          </Modal>

          <Modal
            show={openModal}
            size="lg"
            popup
            onClose={() => setOpenModal(false)}
            initialFocus={!openModal2 ? QuestionInputRef : CustQestionRef}
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
                            Answer: AnswerInputRef.current.value,
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
                      className="mr-2"
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
    </>
  );
}
