'use client';
import React from 'react';
import { StartInterview } from '../../../components/components';
function MainComponent() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isListVisible, setIsListVisible] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);

  React.useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const fullQuestionList = [
    'What is your greatest strength?',
    'Where do you see yourself in 5 years?',
    'Why should we hire you?',
  ];

  const questionList = fullQuestionList.slice(0, currentIndex + 1);
  const [CurrentStep, setCurrentStep] = React.useState(1);
  const selectedQuestion = questionList[currentIndex];
  const progressIndicator = `Question ${currentIndex + 1} of ${
    fullQuestionList.length
  }`;
  const toggleListVisibility = () => setIsListVisible(!isListVisible);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentIndex < fullQuestionList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const RenderStep = () => {
    switch (CurrentStep) {
      case 1:
        return (
          <StartInterview
            title="Welcome to the interview"
            subtitle="We are excited to have you here. Let's get started with the interview."
            startButtonText="Start Interview"
            onInitiateConversation={() => setCurrentStep(2)}
          />
        );
      case 2:
        return InterviewStep;
      default:
        return null;
    }
  };
  const InterviewStep = (
    <div className="flex flex-col lg:flex-row w-full">
      <div
        className={`bg-white overflow-hidden shadow-lg h-full transition-all ease-in-out duration-500 ${
          isListVisible ? 'lg:w-2/5' : 'lg:w-0'
        }`}
      >
        <h1
          className="text-2xl font-crimson-text text-gray-800 text-center p-4 cursor-pointer"
          onClick={toggleListVisibility}
        >
          {progressIndicator}
        </h1>

        {isListVisible && (
          <ul className="max-h-96 overflow-y-auto">
            {questionList.map((question, index) => (
              <li
                key={question}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${
                  currentIndex === index
                    ? 'bg-blue-100 border-l-4 border-blue-500 pl-2'
                    : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {question}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className={`flex-grow p-4 lg:p-8 flex flex-col h-auto lg:h-full lg:max-w-full transition-all ease-in-out duration-500 ${
          !isListVisible ? 'lg:max-w-full' : 'lg:max-w-3xl'
        }`}
      >
        <div className="flex items-center lg:items-start mb-4">
          <h1 className="font-roboto text-2xl font-semibold mb-2 text-[#333]">
            {selectedQuestion}
          </h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between h-full lg:mb-4">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
            <div className="relative h-full">
              <video
                src="https://cvoiceprodwus2.blob.core.windows.net/batch-synthesis-output/e3d0f6ab-0358-410b-aed0-14bfc32dd828/0001.webm?skoid=85130dbe-2390-4897-a9e9-5c88bb59daff&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skt=2024-03-14T00%3A14%3A38Z&ske=2024-03-20T00%3A19%3A38Z&sks=b&skv=2023-11-03&sv=2023-11-03&st=2024-03-14T00%3A14%3A38Z&se=2024-03-15T00%3A19%3A38Z&sr=b&sp=rl&sig=BgVJnxKXHuNU8blQlD2Cu1QJ4ZgBKlASY1W%2BYopLob0%3D"
                className={`w-full rounded-lg shadow h-4/5 mb-2 border-4 ${
                  isRecording ? 'border-red-500' : 'border-transparent'
                }`}
                controls
              ></video>
              <div className="flex justify-between items-center p-2">
                {isRecording ? (
                  <button
                    className="text-white font-roboto py-2 px-4 rounded-full bg-red-500"
                    onClick={handleStopRecording}
                  >
                    Stop Recording
                  </button>
                ) : (
                  <button
                    className="text-white font-roboto py-2 px-4 rounded-full bg-green-500"
                    onClick={handleStartRecording}
                  >
                    Start Recording
                  </button>
                )}
                <span
                  className={`font-roboto text-lg rounded-full ${
                    isRecording ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <video
              className={`w-full rounded-lg shadow mb-2 h-4/5 border-2 ${
                isRecording ? 'border-green-600' : 'border-transparent'
              }`}
              controls
              src={`path/to/interview-question-video-${currentIndex}.mp4`}
            ></video>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-l-lg"
            disabled={currentIndex <= 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            Previous
          </button>
          <button
            className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-r-lg"
            disabled={currentIndex >= fullQuestionList.length - 1}
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  return RenderStep();
}

export default MainComponent;
