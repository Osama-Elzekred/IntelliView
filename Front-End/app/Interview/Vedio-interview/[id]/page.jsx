'use client';
import React from 'react';
import { StartInterview } from '../../../components/components';
import { useState, useRef, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';

function MainComponent({ params }) {
  const fetchMockData = async () => {
    const authToken = Cookies.get('authToken');
    try {
      const response = await fetch(
        `https://localhost:7049/api/Interview/mock/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMockData(data);
        setFullQuestionList(data.questions);
        setQuestionVideos(data.questions.map((question) => question.url));
        setQVideo(data.questions[0].url);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const [mockData, setMockData] = useState({});
  const [fullQuestionList, setFullQuestionList] = useState([]);
  const [questionVideos, setQuestionVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isListVisible, setIsListVisible] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [arrow, setArrow] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState(
    Array(fullQuestionList.length).fill(null)
  );
  const mediaRecorderRef = useRef(null);
  const [userVideo, setUserVideo] = useState([]);
  useEffect(() => {
    fetchMockData();
  }, []);

  React.useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);
  const [qVideo, setQVideo] = useState(questionVideos[0]);
  const questionList = fullQuestionList.slice(0, currentIndex + 1);
  const [CurrentStep, setCurrentStep] = React.useState(1);
  const selectedQuestion = questionList[currentIndex];
  const progressIndicator = `Question ${currentIndex + 1} of ${
    fullQuestionList.length
  }`;
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
    setArrow(!arrow);
  };

  // start recording code
  const handleStartRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      // Enable the audio track during streaming
      mediaStream.getAudioTracks().map((track) => (track.enabled = true));
      videoRef.current.srcObject = mediaStream;
      // Create a new MediaRecorder with video and audio stream
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: 'video/webm' });
          const newRecordedVideos = [...recordedVideos];
          newRecordedVideos[currentIndex] = blob;
          setRecordedVideos(newRecordedVideos);
          const blobUrl = URL.createObjectURL(blob);
          setUserVideo(blobUrl);
          console.log(recordedVideos);
        }
      };
      mediaRecorder.start();
      setRecordingTime(0);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  // stop recording code
  const handleStopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  //next button code...
  const recordedVideosLength = recordedVideos.filter(
    (video) => video !== null
  ).length;
  const handleNextQuestion = () => {
    if (currentIndex < fullQuestionList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setQVideo(questionVideos[currentIndex + 1]);
      setRecordingTime(0);
      setRecordingTime(0);
    }
  };

  //prev button code....
  //prev button code....
  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setQVideo(questionVideos[currentIndex - 1]);
    setRecordingTime(0);
    setRecordingTime(0);
  };

  //post recorded videos
  //post recorded videos
  const formData = new FormData();
  recordedVideos.forEach((video, index) => {
    formData.append(`video${index}`, video);
  });
  const handleUploadVideos = HandleUploadVideos(formData);
  useEffect(() => {
    if (recordingTime === 59) {
      handleStopRecording();
      console.log('stop');
    }
  }, [recordingTime]);

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
            title={`Welcome to the interview on ${mockData.title}`}
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
                key={index}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${
                  currentIndex === index
                    ? 'bg-blue-100 border-l-4 border-blue-500 pl-2'
                    : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {question.question}
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
        {/* arrow code */}
        {arrow && (
          <div
            className=" fixed top-2 left-0 cursor-pointer"
            onClick={toggleListVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-circle h-10 w-10 top-1 left-1"
              viewBox="0 0 16 16"
            >
              {' '}
              <path
                fill="black"
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />{' '}
            </svg>
          </div>
        )}
        <br />
        <div className="flex items-center lg:items-start mb-4">
          <h1 className="font-roboto text-2xl font-semibold mb-2 text-[#333]">
            {selectedQuestion ? selectedQuestion.question : ''}
          </h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between h-full lg:mb-4">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
            <div className="relative h-full">
              <video
                className={`w-full rounded-lg shadow h-4/5 mb-2 border-4 ${
                  isRecording ? 'border-red-500' : 'border-transparent'
                }`}
                width="1200"
                height="900"
                autoPlay
                playsInline
                muted
                ref={videoRef}
                // poster="/Images/ai.jpg"
                // poster="/Images/ai.jpg"
              ></video>

              <div className="flex justify-between items-center p-2">
                {isRecording === true ? (
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
            {qVideo && (
              <video
                className={`w-full rounded-lg shadow mb-2 h-4/5 border-2 ${
                  isRecording ? 'border-green-600' : 'border-transparent'
                }`}
                width="640"
                height="480"
                controls
                src={qVideo}
                type="video/mp4"
              ></video>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-l-lg"
            disabled={currentIndex <= 0}
            onClick={handlePrevious}
          >
            Previous
          </button>
          {currentIndex < fullQuestionList.length - 1 ? (
            <button
              className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-r-lg"
              disabled={
                isRecording || recordedVideosLength !== currentIndex + 1
              }
              onClick={() => {
                handleNextQuestion();
              }}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-r-lg"
              onClick={handleUploadVideos}
              disabled={
                isRecording || recordedVideosLength !== currentIndex + 1
              }
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return RenderStep();
}

export default MainComponent;
function HandleUploadVideos(formData) {
  return async () => {
    try {
      const response = await fetch('/upload-videos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Videos uploaded successfully');
        redirect(`/job/${params.id}`);
      } else {
        console.error('Failed to upload videos');
      }
    } catch (error) {
      console.error('Error uploading videos:', error);
    }
  };
}
