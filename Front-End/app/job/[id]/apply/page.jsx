"use client";
import React from "react";

function MainComponent() {
  const [currentStep, setCurrentStep] = React.useState(1);

  function handleNext() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function handleBack() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  const StepOne = (
    <div>
      <h3 className="font-semibold mb-4">Personal info</h3>
      <form>
        <input
          name="fullName"
          className="w-full p-2 mb-4 border rounded"
          placeholder="First and Last Name"
          type="text"
        />
        <input
          name="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email Address"
          type="email"
        />
        <input
          name="phone"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Phone"
          type="tel"
        />
        <div className="mb-4">
          <label className="mr-2">Gender: </label>
          <input
            name="gender"
            className="mr-1"
            type="radio"
            value="Male"
            id="genderMale"
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
          />
          <label htmlFor="genderFemale">Female</label>
        </div>
        <div className="mb-4">
          <label>
            Upload CV (File accepted: .pdf- Max file size: 5MB)
          </label>
          <input
            name="resume"
            className="w-full p-2 border rounded"
            type="file"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-[#1dbe72] text-white py-2 px-4 rounded hover:bg-[#17a162]"
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
      <h3 className="font-semibold mb-4">Experience</h3>
      <form>
        <label>Select your specialities</label>
        <input
          name="webDesign"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Web Design"
          type="text"
        />
        <input
          name="illustration"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Illustration"
          type="text"
        />
        <input
          name="uiUxDesign"
          className="w-full p-2 mb-4 border rounded"
          placeholder="UI/UX Design"
          type="text"
        />
        <input
          name="mobileDesign"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Mobile Design"
          type="text"
        />
        <input
          name="otherSkills"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Other Skills (Separated by commas)"
          type="text"
        />
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-[#1dbe72] text-white py-2 px-4 rounded hover:bg-[#17a162]"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return StepOne;
      case 2:
        return StepTwo;
      // More cases for additional steps can be added here
      default:
        return (
          <div>
            <h3 className="font-semibold mb-4">Thank you abbass!</h3>
            <p>Your application has been submitted.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f7f7f7]">
      <div className="w-1/2 bg-[#1dbe72] p-10 text-white">
        {/* Add the photo here */}
        <img
          src="/images/info_graphic_1.png"
          alt="Photo"
          className="h-100 object-contain"
        />
        {/* Unchanged left-side content */}
      </div>
      <div className="w-1/2 p-10">
        <div className="float-right">
          <i className="fa fa-bars fa-2x cursor-pointer"></i>
        </div>
        <div className="clear-both"></div>
        <div className="mt-10">
          <h2 className="text-[#1dbe72] text-2xl font-bold mb-4">
            Presentation
          </h2>
          {renderStep()}
        </div>
      </div>
    </div>
  );
  
  
}

export default MainComponent;