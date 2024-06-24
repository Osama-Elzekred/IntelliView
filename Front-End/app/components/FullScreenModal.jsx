'use client';
import { useEffect } from 'react';
import AIcharts from '../components/AiCharts/AIcharts';
import { Button, Card } from 'flowbite-react';

const FullScreenModal = ({ onClose, rowData }) => {
  // Mock video URL

  const {
    id,
    title,
    date,
    InterviewQuestion,
    aiRating,
    duration,
    level,
    notes,
    videoUrl,
    aiObjects,
  } = rowData;
  useEffect(() => {
    // Disable scrolling on the body element when the modal is opened
    document.body.style.overflow = 'hidden';
    // //console.log(rowData, 'rowData');
    //console.log(aiObjects, 'aiObjects');

    // Re-enable scrolling on the body element when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed top-[64px] right-0 w-3/4  bg-black bg-opacity-50 z-50  h-full ">
      <div className="bg-slate-50 rounded-lg p-8  h-full overflow-y-auto  pb-60">
        <div className="flex justify-end">
          <div className="h-5 w-5 cursor-pointer m-1" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="">
          <AIcharts aiScores={aiObjects} />
        </div>
        <div className="flex flex-col md:flex-row m-2 ">
          {/* Video Element */}
          <div className="flex-1 flex justify-center items-center md:mr-4">
            <video
              src={videoUrl}
              width="640"
              height="480"
              controls
              autoPlay
              loop
              className="rounded-md"
            ></video>
          </div>
          {/* Video Details */}
          <div className="flex-1 mt-4 md:mt-0">
            <p className="text-lg font-semibold mb-2">AI Score: {aiRating}</p>
            <p className="text-lg font-semibold mb-2">
              Comments(notes) :{notes}
            </p>
            <p className="text-lg font-semibold mb-2">Recorded Date: {date}</p>
            <p className="text-lg font-semibold mb-2">
              Question: {InterviewQuestion?.Question}
            </p>
            <p className="text-lg font-semibold mb-2">
              Model Answer: {InterviewQuestion?.answer}
            </p>
          </div>
        </div>

        {/* Close Button */}
      </div>
    </div>
  );
};

export default FullScreenModal;
