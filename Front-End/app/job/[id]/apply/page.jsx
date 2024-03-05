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
            Upload CV (File accepted: .pdf - Max file size: 5MB)
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
      <form>
        <label>Select your specialities</label>
        <input
          name="webDesign"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Web Design"
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
            className="bg-[#17a9c3] text-white py-2 px-4 rounded hover:bg-[#17a162]"
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
      default:
        return (
          <div>
            <h3 className="font-semibold mb-4 text-[#17a9c3]">Thank you!</h3>
            <p>Your application has been submitted.</p>
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
      <div className="w-3/3 p-10 flex justify-center lg:2/3 sm:w-2/3">
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