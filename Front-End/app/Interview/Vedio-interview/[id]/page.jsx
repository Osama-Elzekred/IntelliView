'use client';
import React, { useState, useRef, useEffect } from 'react';
import { StartInterview, UserAlert } from '../../../components/components';
import Cookies from 'js-cookie';
import { Button, Modal } from 'flowbite-react';
import Link from 'next/link';
import Loading from '../../../components/loading';

const DOMAIN_NAME = 'localhost:7049';
function MainComponent({ params }) {
  const [error, setError] = useState(false);

  const authToken = Cookies.get('authToken');
  const [loading, setLoading] = useState(true);
  const fetchMockData = async () => {
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/Interview/mock/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        return response.text().then((errorMessage) => {
          console.error('Error: ', errorMessage);
          if (errorMessage === null || errorMessage === false) {
            errorMessage = 'Something went wrong. Please try again later.';
          }
          setError(errorMessage);
          // Display the error message to the user, or handle it in some other way
        });
      }
      const data = await response.json();
      setMockData(data);
      setFullQuestionList(data.questions);
      setQuestionVideos(data.questions.map((question) => question.url));
      setQVideo(data.questions[0].url);
      // Initialize recordedVideos with an array of nulls based on the number of questions
      setRecordedVideos(Array(data.questions.length).fill(null));
      console.log(data);
    } catch (error) {
      // TODO: Display a user-friendly error message
    }
    setLoading(false);
  };

  const [mockData, setMockData] = useState({
    questions: [],
    title: null,
    jobId: null,
    mockSessionId: null,
    authorized: false,
  });
  const [fullQuestionList, setFullQuestionList] = useState([]);
  const [questionVideos, setQuestionVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isListVisible, setIsListVisible] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [recorded, setRecorded] = React.useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [arrow, setArrow] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState(
    Array(fullQuestionList.length).fill(null)
  );
  const mediaRecorderRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
  const recordedVideosLength = recordedVideos.filter(Boolean).length;

  const handleNextQuestion = () => {
    if (currentIndex < fullQuestionList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setQVideo(questionVideos[currentIndex + 1]);
      setRecordingTime(0);
      setRecorded(false);
    }
    uploadVideo(
      recordedVideos[currentIndex],
      selectedQuestion.id,
      params.id,
      mockData.mockSessionId
    );
  };

  //prev button code....
  //prev button code....
  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setQVideo(questionVideos[currentIndex - 1]);
    setRecordingTime(0);
  };

  //post recorded videos
  //post recorded videos
  const formData = new FormData();
  recordedVideos.forEach((video, index) => {
    formData.append(`video${index}`, video);
  });
  useEffect(() => {
    if (recordingTime === 59) {
      handleStopRecording();
      console.log('stop');
      setRecorded(true);
      // handleNextQuestion();
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
                    onClick={() => {
                      handleStopRecording();
                      setRecorded(true);
                    }}
                  >
                    Stop Recording
                  </button>
                ) : (
                  !recorded && (
                    <button
                      className="text-white font-roboto py-2 px-4 rounded-full bg-green-500"
                      onClick={handleStartRecording}
                    >
                      Start Recording
                    </button>
                  )
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
        <div className="d-flex flex-wrap gap-2 justify-content-start align-items-center row mt-4">
          {/* <button
            className="bg-gray-300 text-gray-800 font-roboto py-2 px-4 rounded-l-lg"
            disabled={currentIndex <= 0}
            onClick={handlePrevious}
          >
            Previous
          </button> */}
          <div className="col-6"></div>
          {currentIndex < fullQuestionList.length - 1 ? (
            <Button
              gradientDuoTone="purpleToBlue"
              className="col-6 font-roboto py-2 px-4 m-2 flex-1 rounded-lg ml-auto"
              disabled={
                isRecording || recordedVideosLength !== currentIndex + 1
              }
              onClick={() => {
                handleNextQuestion();
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              isProcessing={finished}
              gradientDuoTone="greenToBlue"
              className="col-3 font-roboto py-2 px-4 m-2 flex-1 rounded-lg ml-auto"
              size="md"
              onClick={() => {
                setFinished(true);
                uploadVideo(
                  recordedVideos[currentIndex],
                  selectedQuestion.id,
                  params.id,
                  mockData.mockSessionId
                );
              }}
              disabled={
                isRecording || recordedVideosLength !== currentIndex + 1
              }
            >
              Finish
            </Button>
          )}
        </div>
      </div>
      <>
        <Modal
          show={openModal}
          size="lg"
          // onClose={() => setOpenModal(false)}
          popup
        >
          {/* <Modal.Header /> */}
          <Modal.Body className="mt-4">
            <div className="text-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-green-600"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-5 mt-1 text-lg font-normal text-black-500 ">
                Your interview has been successfully completed.
              </h3>
              <h5 className="mb-5 text-sm font-normal text-black-500 ">
                You can now close the window.
                <br /> We will contact you soon !
              </h5>
              <div className="flex justify-center gap-4">
                <Link href="/job/user-jobs" as={`/job/user-jobs`} passHref>
                  <Button
                    gradientMonochrome="success"
                    // onClick={() => setOpenModal(false)}
                  >
                    {'Done'}
                  </Button>
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
  if (error) {
    return (
      <div className="p-2 m-3">
        <UserAlert
          Color="red"
          Message={error}
          onDismissClick={() => setError(null)}
        />
      </div>
    );
  }
  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

  async function uploadVideo(blob, questionId, mockid, mockSessionId) {
    const formData = new FormData();
    formData.append('video', blob);
    console.log(blob);
    console.log(authToken);
    const response = await fetch(
      `https://${DOMAIN_NAME}/api/Interview/MockSession/${mockSessionId}/mock/${mockid}/question/${questionId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      }
    );
    if (currentIndex === fullQuestionList.length - 1) {
      setOpenModal(true);
    }
    if (!response.ok) {
      throw new Error('Upload failed');
    }
  }
  return RenderStep();
}

export default MainComponent;
