'use client';
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Breadcrumb,
  Loading,
  VideoReview,
} from '../../components/components';
import FullScreenModal from '../../components/FullScreenModal';
import Cookies from 'js-cookie';
import config from '../../../config';

import VideoTable from './VideosTable';
function MainComponent({ params }) {
  const [loading, setLoading] = useState(true);
  const { DOMAIN_NAME } = config;
  // const DOMAIN_NAME = '//localhost:7049/api';

  const [data, setData] = useState([
    {
      id: 1,
      videoUrl: '',
      title: 'Walk me through your resume and your background.',
      date: '30 Apr 2021',
      aiRating: 4.7,
      duration: '00:38',
      level: 'Level 3',
      notes: 'learn more about soft skills',
      checked: false,
    },
  ]);
  const transformData = (userMockSessionDTO) => {
    if (!userMockSessionDTO || !userMockSessionDTO.answers) {
      return [];
    }

    return userMockSessionDTO.answers.map((answer, index) => {
      const date = new Date(answer.answeredAt);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return {
        id: answer.id,
        videoUrl: answer.answerVideoURL,
        title: answer.answerText,
        date: formattedDate,
        InterviewQuestion: {
          Id: answer.interviewQuestion.id,
          Question: answer.interviewQuestion.question,
          answer: answer.interviewQuestion.modelAnswer,
          VideoId: answer.interviewQuestion.videoId,
          answerText: answer.answerAiEvaluationScore.answerText,
        },
        similarityScore: answer.answerAiEvaluationScore
          ? answer.answerAiEvaluationScore.answerSimilarityScore
          : null,
        aiObjects: answer.answerAiEvaluationScore,
        duration: '00:00', // You'll need to get this from somewhere
        level: 'Level 3', // You'll need to get this from somewhere
        notes: 'No notes', // You'll need to get this from somewhere
        checked: false,
      };
    });
  };
  const toggleCheck = (id) =>
    setData(
      data.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  // get avreage score

  const getAverage = () => {
    let sum = 0;
    // console.log('dataaaaaa : ', data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].aiObjects?.totalScore) {
        sum += data[i].aiObjects?.totalScore; // Add the number directly
      }
    }
    let average = sum / data.length;
    // console.log('average : ', average.toFixed(2)); // Convert to string here if needed
    return average.toFixed(2);
  };
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sessionData, setSessionData] = useState({}); // Add sessionData state
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Function to handle row click and display details screen
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    //console.log('rowData : ', rowData);
    setDetailsVisible(true);
  };
  // console.log(data[0]?.aiObjects);
  // Function to close the details screen
  const closeDetailsScreen = () => {
    setSelectedRowData(null);
    setDetailsVisible(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/MockSession/UserMockSession/${params.MockSesstionId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const userMockSessionDTO = await response.json();

          //console.log('userMockSessionDTO : ', userMockSessionDTO);
          // Transform the UserMockSessionDTO into the shape of the data object
          const data = transformData(userMockSessionDTO);
          // console.log('data : ', data);

          setSessionData({
            mockid: userMockSessionDTO.mockId,
            jobid: userMockSessionDTO.jobId,
            // mockname: userMockSessionDTO.mockSessionName,
          });

          // Set the state
          setData(data);
        }
      } catch (error) {
        console.error('error : ', error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="font-roboto bg-white">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>
        {/* .site-mobile-menu */}
        {/* HOME */}
        <Breadcrumb
          links={[
            {
              name: `${
                sessionData.jobid !== null
                  ? `Applicants Mock Sessions`
                  : `My Mocks`
              }`,
              link: `${
                sessionData.jobid !== null
                  ? `/Interview/mockApplicants/${sessionData.mockid}`
                  : `/Interview/mocks/user-mocks`
              }`,
            },
            {
              name: 'User Analysis',
              link: '#',
            },
          ]}
        />
        <div className=" flex items-center justify-center ">
          <div className="mx-auto space-y-2  p-4" style={{ width: '90%' }}>
            <div className="flex justify-center space-x-4 ">
              <div className="flex flex-row bg-white shadow-sm rounded p-4 ">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-camera-fill w-10 h-10"
                    viewBox="0 0 16 16"
                    style={{ color: 'inherit' }}
                  >
                    {' '}
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />{' '}
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />{' '}
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-900">videos</div>
                  <div className="font-bold text-lg text-gray-900">
                    {data.length}
                  </div>
                </div>
              </div>

              <div className=" flex justify-center ">
                <div className="flex flex-row bg-white shadow-sm rounded p-4">
                  <div className="flex items-center justify-center  h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-bar-chart h-10 w-10"
                      viewBox="0 0 16 16"
                      style={{ color: 'inherit' }}
                    >
                      {' '}
                      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />{' '}
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ml-4">
                    <div className="text-sm text-gray-900">Average Score</div>
                    <div className="font-bold text-lg text-gray-900">
                      {data.length > 0 && getAverage()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {detailsVisible && selectedRowData && (
              <FullScreenModal
                onClose={closeDetailsScreen}
                rowData={selectedRowData}
              />
            )}
            {/* <VideoReview
              resumeScore={3}
              videoScores={43}
              workmapScores={55}
              key={1}
            /> */}
            <VideoTable
              Data={data}
              handleRowClick={handleRowClick}
              IsAnalysing={
                data.length > 0 && data[0]?.aiObjects === undefined
                  ? true
                  : false
              }
            />
            {/* <style jsx global>{`
              input[type='checkbox']:checked + label {
                border-color: #17a9c3;
                background-color: #17a9c3;
              }
              input[type='checkbox']:checked + label svg {
                display: block;
              }
              input[type='checkbox']:not(:checked) + label {
                border-width: 1px;
                border-color: #d0d5dd;
              }
              input[type='checkbox']:checked + label {
                border-width: 1px;
                border-color: #fff;
              }
              label {
                width: 20px;
                height: 20px;
                border-radius: 6px;
              }
              svg {
                color: #fff;
              }
            `}</style> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default MainComponent;
