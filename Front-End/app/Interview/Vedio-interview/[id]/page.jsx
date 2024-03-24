"use client";
import React from "react";
import { StartInterview } from "../../../components/components";
import { useState, useRef ,useEffect} from "react";
import { redirect } from "next/navigation";

function MainComponent() {
  const fullQuestionList = [
    "What is your greatest strength?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "what is the expected salary?"
  ];
  const questionVideos = [
    "/images/vid1.mp4",
    "/images/vid1.mp4",
    "/images/vid1.mp4",
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isListVisible, setIsListVisible] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [recordedVideos, setRecordedVideos] = useState(Array(fullQuestionList.length).fill(null));  
  const mediaRecorderRef = useRef(null);
  const [userVideo, setUserVideo] = useState([]);
  React.useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);
  const [qVideos, setQVideos] = useState(questionVideos[0]);
  const questionList = fullQuestionList.slice(0, currentIndex + 1);
  const [CurrentStep, setCurrentStep] = React.useState(1);
  const selectedQuestion = questionList[currentIndex];
  const progressIndicator = `Question ${currentIndex + 1} of ${
    fullQuestionList.length
  }`;
  const toggleListVisibility = () => setIsListVisible(!isListVisible);
  
  // start recording code 
  const handleStartRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      // Mute the audio track during streaming
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      videoRef.current.srcObject = mediaStream;
      // Create a new MediaRecorder with video and audio stream
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      setRecordingTime(0);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: "video/webm" });
          const newRecordedVideos = [...recordedVideos];
          newRecordedVideos[currentIndex] = blob;
          setRecordedVideos(newRecordedVideos);
          const blobUrl = URL.createObjectURL(blob);
          setUserVideo(blobUrl);
          console.log(recordedVideos); 
        }
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };
// stop recording code .... 
  const handleStopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsRecording(false);
      
    }
  };

  //next button code... 
  const recordedVideosLength = recordedVideos.filter(video => video !== null).length;
  const handleNextQuestion = () => {
    if (currentIndex < fullQuestionList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setQVideos(questionVideos[currentIndex + 1]);
      setRecordingTime(0)
    }
  };

//prev button code....  
  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setQVideos(questionVideos[currentIndex - 1]);
    setRecordingTime(0)
  };

//post recorded videos 
  const formData = new FormData();
  recordedVideos.forEach((video, index) => {
    formData.append(`video${index}`, video);
  });
    const handleUploadVideos = async () => {
    try {

      const response = await fetch("/upload-videos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Videos uploaded successfully");
        redirect("/job/1"); 
      } else {
        console.error("Failed to upload videos");
      }
    } catch (error) {
      console.error("Error uploading videos:", error);
    }
  };
  useEffect(()=> {
    if (recordingTime === 59 ){
      handleStopRecording(); 
      console.log("stop"); 
    }
  },[recordingTime])

  const minutes = Math.floor(recordingTime / 60);
  const seconds = recordingTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;


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
          isListVisible ? "lg:w-2/5" : "lg:w-0"
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
                    ? "bg-blue-100 border-l-4 border-blue-500 pl-2"
                    : ""
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
          !isListVisible ? "lg:max-w-full" : "lg:max-w-3xl"
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
                className={`w-full rounded-lg shadow h-4/5 mb-2 border-4 ${
                  isRecording ? "border-red-500" : "border-transparent"
                }`}
                width="1200"
                height="900"
                autoPlay
                playsInline
                muted
                ref={videoRef}
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
                    isRecording ? "text-red-500" : "text-green-500"
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
                isRecording ? "border-green-600" : "border-transparent"
              }`}
              width="640"
              height="480"
              controls
              src={qVideos}
              type="video/mp4"
            ></video>
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
              disabled = {isRecording || recordedVideosLength !== currentIndex + 1 }
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
              disabled = {isRecording || recordedVideosLength !== currentIndex + 1}
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