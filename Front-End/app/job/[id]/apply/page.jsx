'use client';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import { Loading, PhoneInputGfg } from '../../../components/components';
import config from '../../../../config';

function Apply({ params }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = useState({
    JobId: parseInt(params.id),
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    CV: null,
  });
  const [loading, setLoading] = useState(true);
  const [questionslist, setQuestionslist] = useState([]);
  const [answerslist, setQuesionsAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // const DOMAIN_NAME = 'localhost:7049/api';

  const { DOMAIN_NAME } = config;
  function handleNext() {
    if (currentStep === 1) {
      if (validateStepOne()) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
    if (currentStep === 2) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  }

  function handleBack() {
    setCurrentStep((prevStep) => prevStep - 1);
  }
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const validateStepOne = () => {
    let validationErrors = {};

    if (!answers.fullName) {
      validationErrors.fullName = 'Full name is required';
    }

    if (!answers.email || !isValidEmail(answers.email)) {
      validationErrors.email = 'Valid email is required';
    }

    if (!answers.phone || !isValidPhone(answers.phone)) {
      validationErrors.phone = 'Valid phone number is required';
    }

    if (!answers.gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (!answers.CV) {
      validationErrors.CV = 'CV is required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[0-9]{12}$/.test(phone);
  };
  const fetchQuestions = async () => {
    const authToken = Cookies.get('authToken');
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/job/questions/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setQuestionslist(data);
          const initialAnswers = data.reduce(
            (acc, [id]) => ({ ...acc, [id]: '' }),
            {}
          );
          setQuesionsAnswers(initialAnswers);
        });
      // if (!response.ok) {
      //   throw new Error('Failed to fetch questions');
      // }
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      // Handle the error appropriately, e.g., display an error message to the user
      setError('Failed to fetch questions. Please try again later.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions(params.id); // Pass the jobId parameter
  }, []); // Add jobId to the dependency array

  // Function to handle input change and update personalInfo state
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file input separately
    if (type === 'file') {
      const file = files[0]; // Get the first file from the files array
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: file, // Update the state with the file object
      }));
    } else {
      const inputValue = value;
      if (
        name === 'fullName' ||
        name === 'email' ||
        name === 'phone' ||
        name === 'gender'
      ) {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [name]: inputValue,
        }));
      }

      // Basic input validation for email and phone
      if (name === 'email' && !isValidEmail(value)) {
        // Handle invalid email
        //console.log('Invalid email');
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
        }));
      }

      if (name === 'phone' && !isValidPhone(value)) {
        // Handle invalid phone number
        //console.log('Invalid phone number');
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
        }));
      }
    }
  };
  // Function to send personalInfo and answers to the backend
  const sendAnswers = async () => {
    const authToken = Cookies.get('authToken');

    try {
      const formData = new FormData(); // Create a new FormData object

      // Append each key-value pair to the formData object
      Object.entries(answers).forEach(([key, value]) => {
        // If the value is a file (CV), append it as a file
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value)); // Convert non-file values to JSON strings
        }
      });

      formData.append('questionsAnswers', JSON.stringify(answerslist));
      //console.log(formData);
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/JobApplication/submitAnswers`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData, // Send formData in the request body
        }
      );

      if (response.ok) {
        handleNext();
        //console.log('Answers submitted successfully!');
        // Optionally, handle success response from the backend
      } else {
        //console.log('Failed to submit answers');
        // Optionally, handle error response from the backend
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
      // Handle fetch error
    }
  };
  const handleAnswerChange = (event) => {
    const { name, value } = event.target;
    setQuesionsAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };
  const renderQuestions = () => {
    return questionslist.map(({ item1: id, item2: question }) => (
      <div key={id} className="mb-4">
        <label htmlFor={`question-${id}`} className="block font-medium mb-1">
          {question}
        </label>
        <textarea
          className="w-full p-2 border rounded"
          id={`question-${id}`}
          name={id.toString()}
          value={answerslist[id] || ''}
          onChange={handleAnswerChange}
        />
      </div>
    ));
  };

  const StepOne = (
    <div>
      <h3 className="font-semibold mb-4">Personal info</h3>
      <form>
        <input
          name="fullName"
          className="w-full p-2 mb-4 border rounded"
          placeholder="First and Last Name"
          type="text"
          value={answers.fullName}
          onChange={handleChange}
          required // Add required attribute for input validation
        />{errors.fullName && (
          <div className="text-red-500 mb-4">{errors.fullName}</div>
        )}
        <input
          name="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email Address"
          type="email"
          value={answers.email}
          onChange={handleChange}
          required // Add required attribute for input validation
        />{errors.email && (
          <div className="text-red-500 mb-4">{errors.email}</div>
        )}
        <div className="m-2">
          <PhoneInputGfg
            name="phone"
            placeholder="Phone"
            type="tel"
            value={answers.phone}
            handlePhoneChange={(phone) =>
              handleChange({ target: { name: 'phone', value: phone } })
            }
          />{errors.phone && (
            <div className="text-red-500 mb-4">{errors.phone}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="mr-4">Gender: </label>
          <input
            name="gender"
            className="mr-1"
            type="radio"
            value="Male"
            id="genderMale"
            checked={answers.gender === 'Male'}
            onChange={handleChange}
            required // Add required attribute for input validation
          />
          <label className="mr-4" htmlFor="genderMale">
            Male
          </label>
          <input
            name="gender"
            className="mr-1"
            type="radio"
            value="Female"
            id="genderFemale"
            checked={answers.gender === 'Female'}
            onChange={handleChange}
            required // Add required attribute for input validation
          />
          <label htmlFor="genderFemale">Female</label>
        </div>
        {errors.gender && (
          <div className="text-red-500 mb-4">{errors.gender}</div>
        )}
        <div className="mb-4">
          <label>Upload CV (File accepted: .pdf - Max file size: 5MB)</label>
          <input
            name="CV"
            className="w-full p-2 border rounded"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            required // Add required attribute for input validation
          />
        </div>
        {errors.CV && (
          <div className="text-red-500 mb-4">{errors.CV}</div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-[#17a9c3] text-white py-2 px-4 rounded hover:bg-[#17a162]"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  const StepTwo = (
    <div>
      {questionslist.length > 0 && (
        <h3 className="font-semibold mb-4 ">Answer Questions</h3>
      )}
      <form>{renderQuestions()}</form>
      <div className="flex justify-between mb-4 space-x-2">
        <button
          type="button"
          className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
          onClick={handleBack}
        >
          Back
        </button>
        <Button
          type="button"
          className="bg-[#17a9c3] text-white py-2 px-4 rounded hover:bg-[#17a162]"
          isProcessing={finished}
          gradientDuoTone="greenToBlue"
          size="sm"
          onClick={() => {
            // //console.log(answers);
            setFinished(true);
            sendAnswers();
          }} // Call handleSubmit when submitting answers
        >
          submit
        </Button>
      </div>
      <div className=" mb-4">
        <span
          style={{ display: 'inline-block', width: '100px', height: '20px' }}
        ></span>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return StepOne;
      case 2:
        return StepTwo;
      default:
        return (
          <div>
            <h3 className="font-semibold mb-4 text-[#17a9c3]">Thank you!</h3>
            <p>Your application has been submitted.</p>
            <Link href="/job">Back to job list</Link>
          </div>
        );
    }
  };

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

  return (
    <div className="flex h-screen bg-[#f7f7f7]">
      <div className="w-1/3 bg-[#17a9c3] p-10 text-white flex-col justify-between hidden sm:block">
        <div>
          <div className="flex justify-between">
            <div className="footer-social">
              <a href="#" className="mr-1">
                <span className="icon-facebook" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-twitter" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-instagram" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-linkedin" />
              </a>
            </div>
            <div>
              <i className="fa fa-bars fa-2x cursor-pointer"></i>
            </div>
          </div>
          <div className="mt-12"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src="/images/info_graphic_1.svg"
            alt="image"
            className="w-50 h-60"
          />
          <h1 className="font-bold text-white text-4xl my-4">We are Hiring</h1>
          <p className="mb-4">please fill the form to apply for the job</p>
          <div className="text-sm mt-32">&copy; 2024 Intelliview</div>
        </div>
      </div>
      <div className="w-3/3 overflow-y-auto p-10 flex justify-center lg:2/3 sm:w-2/3">
        <div className="mt-10">
          <h2 className=" text-2xl font-bold mb-4">Application Form</h2>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Apply;
