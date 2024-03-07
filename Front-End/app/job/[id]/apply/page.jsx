"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

function MainComponent() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = useState({});

  function handleNext() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function handleBack() {
    setCurrentStep((prevStep) => prevStep - 1);
  }
// Add basic input validation for email and phone
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};
  const questions = [
    "What is your previous work experience?",
    "What are your strengths and weaknesses?",
    "How do you handle tight deadlines?",
    "Tell us about a challenging project you worked on and how you overcame obstacles.",
    "What motivates you to excel in your work?",
    "What are your salary expectations?"
  ];

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    CV: null, // Assuming the user uploads a file
  });

  // Function to handle input change and update personalInfo state
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    // Handle file input separately
    if (type === "file") {
      const file = files[0];
      setPersonalInfo((prevInfo) => ({
        ...prevInfo,
        [name]: file,
      }));
    } else {
      const inputValue = value;
      if (name === "fullName" || name === "email" || name === "phone" || name === "gender") {
        setPersonalInfo((prevInfo) => ({
          ...prevInfo,
          [name]: inputValue,
        }));
      } else {
        if (name === "CV") {
          const file = files[0];
          setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: file,
          }));
        } else {
          setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: inputValue }));
        }
      }
  
      // Basic input validation for email and phone
      if (name === "email" && !isValidEmail(value)) {
        // Handle invalid email
        console.log("Invalid email");
        setPersonalInfo((prevInfo) => ({
          ...prevInfo,
          showEmailWarning: true,
        }));
      }
  
      if (name === "phone" && !isValidPhone(value)) {
        // Handle invalid phone number
        console.log("Invalid phone number");
        setPersonalInfo((prevInfo) => ({
          ...prevInfo,
          showPhoneWarning: true,
        }));
      }
    }
  };
  
 const DOMAIN_NAME = "localhost:3000/api"; // Replace with your domain name
// Function to send personalInfo and answers to the backend
const sendAnswers = async () => {
  const authToken = Cookies.get("authToken");
  
  // Combine personalInfo and answers into a single object
  const formData = {
    personalInfo,
    answers,
  };

  try {
    const response = await fetch(`https://${DOMAIN_NAME}/submitAnswers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send formData in the request body
    });
    if (response.ok) {
      console.log("Answers submitted successfully!");
      // Optionally, handle success response from the backend
    } else {
      console.log("Failed to submit answers");
      // Optionally, handle error response from the backend
    }
  } catch (error) {
    console.error("Error submitting answers:", error);
    // Handle fetch error
  }
};


  const renderQuestions = () => {
    return questions.map((question, index) => (
      <input
        key={index}
        name={`question${index + 1}`}
        className="w-full p-2 mb-4 border rounded"
        placeholder={question}
        type="text"
        value={answers[`question${index + 1}`] || ""}
        onChange={handleChange}
      />
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
          value={personalInfo.fullName}
          onChange={handleChange}
          required // Add required attribute for input validation
        />
        <input
          name="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email Address"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          required // Add required attribute for input validation
        />
        <input
          name="phone"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Phone"
          type="tel"
          value={personalInfo.phone}
          onChange={handleChange}
          required // Add required attribute for input validation
        />
        <div className="mb-4">
          <label className="mr-4">Gender: </label>
          <input
            name="gender"
            className="mr-1"
            type="radio"
            value="Male"
            id="genderMale"
            checked={personalInfo.gender === "Male"}
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
            checked={personalInfo.gender === "Female"}
            onChange={handleChange}
            required // Add required attribute for input validation
          />
          <label htmlFor="genderFemale">Female</label>
        </div>
        <div className="mb-4">
          <label>
            Upload CV (File accepted: .pdf - Max file size: 5MB)
          </label>
          <input
            name="CV"
            className="w-full p-2 border rounded"
            type="file"
            onChange={handleChange}
            required // Add required attribute for input validation
          />
        </div>
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
      <h3 className="font-semibold mb-4 ">Answer  Questions</h3>
      <form>{renderQuestions()}</form>
      <div className="flex justify-between mb-4">
        <button
          type="button"
          className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-[#17a9c3] text-white py-2 px-4 rounded hover:bg-[#17a162]"
          onClick={sendAnswers} // Call handleSubmit when submitting answers
        >
          submit
        </button>
      </div>
      <div className=" mb-4">
        <span style={{ display: "inline-block", width: "100px", height: "20px" }}></span>
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
          <div >
            <h3 className="font-semibold mb-4 text-[#17a9c3]">Thank you!</h3>
            <p>Your application has been submitted.</p>
            <Link href="/job">Back to job list</Link>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f7f7f7]">
      <div className="w-1/3 bg-[#17a9c3] p-10 text-white flex flex-col justify-between hidden sm:block">
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
            className="w-50 h-60"/>
          <h1 className="font-bold text-4xl my-4">We are Hiring</h1>
          <p className="mb-4">
            please fill the form to apply for the job
          </p>
          <div className="text-sm mt-32">&copy; 2024 Intelliview</div>
        </div>
      </div>
      <div className="w-3/3 overflow-y-auto p-10 flex justify-center lg:2/3 sm:w-2/3">
        <div className="mt-10">
          <h2 className=" text-2xl font-bold mb-4">
            Application Form
          </h2>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;