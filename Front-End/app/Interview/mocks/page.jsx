'use client';
import React, { Suspense } from 'react';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '../../components/loading';

function MainComponent() {
  const [fristTime, setFristTime] = useState(true);
  const [questionSets, setQuestionSets] = React.useState([
    {
      icon: 'fa-star',
      title: 'My Sets',
      description: 'Your personal list of picked out question sets.',
      bgColor: 'bg-[#f87171]',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Featured Sets',
      description:
        'Sets specifically recommended for you by your organization.',
      bgColor: 'bg-[#60a5fa]',
    },
    {
      icon: 'fa-briefcase',
      title: 'Custom Sets',
      description: 'Sets put together by your organization.',
      bgColor: 'bg-[#fbbf24]',
    },
    {
      icon: 'fa-play-circle',
      title: 'General',
      description: 'Covers 80% of the interview questions you might get.',
      bgColor: 'bg-[#34d399]',
    },
    {
      icon: 'fa-industry',
      title: 'By Industry',
      description:
        'Start practicing interviews in hundreds of industries and job titles.',
      bgColor: 'bg-[#a78bfa]',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const IconClasses = [
    'fa-calculator',
    'fa-palette',
    'fa-dna',
    'fa-headset',
    'fa-tshirt',
    'fa-user-tie',
    'fa-bullhorn',
    'fa-plane',
    'fa-hard-hat',
    'fa-tools',
    'fa-comments',
    'fa-fire',
    'fa-gears',
    'fa-landmark',
    'fa-stethoscope',
  ];
  const [Topics, setTopics] = React.useState([]);
  const [interviewMocks, setInterviewMocks] = useState([]);
  const [ClickedTopicIcon, setClickedTopicIcon] = React.useState('');
  const [selectedSet, setSelectedSet] = React.useState(null);
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('entry');
  const [currentStep, setCurrentStep] = React.useState(1);

  const fetchTopics = async () => {
    await fetch('https://localhost:7049/api/InterviewMock/allInterviewTopics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((topic) => {
          topic.IconClass = topic.IconClass =
            IconClasses[Math.floor(Math.random() * IconClasses.length)];
        });

        setTopics(data);
      })
      .catch((error) =>
        console.error(
          'There has been a problem with your fetch operation:',
          error
        )
      );
  };
  const fetchMocks = (id) => {
    setIsLoading(true);
    fetch(
      `https://localhost:7049/api/InterviewMock/GetInterviewMocks/${parseInt(
        id
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setInterviewMocks(
          data.map((item) => ({
            Id: item.id, // Changed to lowercase
            Title: item.title, // Changed to lowercase
            Description: item.description, // Changed to lowercase
            Level: item.level, // Changed to lowercase
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (fristTime) {
      setFristTime(false);
      fetchTopics();
    }
    if (currentStep === 2) {
      setIsLoading(true);
      fetchMocks(selectedTopic);
      setIsLoading(false);
    }
  }, [currentStep, selectedTopic]); // This effect runs whenever currentStep or selectedTopic changes
  // useEffect(() => {
  //   console.log(interviewMocks, 'interviewMocks');
  // }, [interviewMocks]); // This effect runs whenever interviewMocks changes
  const handleSetClick = (title) => setSelectedSet(title);
  const handleTopicClick = (id, IconClass) => {
    setSelectedTopic(id);
    setClickedTopicIcon(IconClass);
    setCurrentStep(2);
  };
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  const filteredOccupations = Topics.filter((occupation) =>
    occupation.topic.toLowerCase().includes(filter.toLowerCase())
  );
  const filteredMocks = interviewMocks.filter(
    (mock) =>
      mock.Title && mock.Title.toLowerCase().includes(filter.toLowerCase())
  );

  const TopicStep = (
    <>
      {filteredOccupations.map((Topic) => (
        <div
          key={Topic.id}
          className={`flex flex-col items-center text-center p-4 bg-gray-50 rounded shadow cursor-pointer ${
            selectedTopic === Topic.topic
              ? 'ring-2 ring-offset-2 ring-[#6366F1]'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => handleTopicClick(Topic.id, Topic.IconClass)}
        >
          <i
            className={`fas ${Topic.IconClass} text-3xl mb-3 text-gray-700`}
          ></i>
          <p className="font-semibold text-sm text-[#121212]">{Topic.topic}</p>
        </div>
      ))}
    </>
  );

  const StepTwo = (
    <>
      {/* <p className="font-semibold text-sm text-100">
        {isLoading && 'Please Wait...'}
      </p> */}
      {filteredMocks.map((Mock) => (
        <>
          
            <div
              key={Mock.Id}
              href={`/Interview/Vedio-interview/${Mock.Id}`}
              className={`inline-flex flex-col items-center text-center p-4 bg-gray-50 rounded shadow cursor-pointer ${
                selectedTopic === Mock.topic
                  ? 'ring-2 ring-offset-2 ring-[#6366F1]'
                  : 'hover:bg-gray-100'
              }`}
            >
              <i
                className={`fas ${ClickedTopicIcon} text-3xl mb-3 text-gray-700`}
              ></i>
              <Link href={`/Interview/Vedio-interview/${Mock.Id}`}>
                <p className="font-semibold text-sm text-[#121212] line-clamp-2 w-full max-w-40 ">
                  {Mock.Title}
                  <br />
                  <span className="font-normal text-sm text-[#121212] line-clamp-1">{`(${Mock.Level})`}</span>
                </p>
              </Link>
              <p className="text-sm text-gray-500 line-clamp-2 w-full max-w-md">
                {Mock.Description}
              </p>
            </div>
          
        </>
      ))}
    </>
  );
  const renderSteps = () => {
    switch (currentStep) {
      case 1:
        return TopicStep;
      case 2:
        return StepTwo;
      default:
        return (
          <div>
            {/* <h3 className="font-semibold mb-4 text-[#17a9c3]">Thank you!</h3> */}
            <p>NO mocks available</p>
            <Link href="/job">Back to job list</Link>
          </div>
        );
    }
  };
  return (
    <Layout>
      <>
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
        {/* NAVBAR */}
        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div
            className="lg:w-1/4 bg-white rounded-lg shadow p-4 overflow-auto"
            style={{ maxHeight: '75vh' }}
          >
            <h2 className="text-lg font-semibold text-[#121212] mb-4">
              Question Sets
            </h2>
            <ul>
              {questionSets.map((set) => (
                <li
                  key={set.title}
                  className={`flex items-center mb-4 cursor-pointer ${
                    selectedSet === set.title
                      ? 'ring-2 ring-offset-2 ring-[#6366F1] bg-gray-100 rounded'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSetClick(set.title)}
                >
                  <span
                    className={`text-2xl rounded-full p-3 mr-3 text-white ${set.bgColor}`}
                  >
                    <i className={`fas ${set.icon}`}></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-[#121212]">{set.title}</h3>
                    <p className="text-sm text-gray-500">{set.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-3/4 bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h2 className="flex-1 text-lg font-semibold text-[#121212]">
                {currentStep !== 1 && (
                  <i
                    className="fa-solid fa-chevron-left  cursor-pointer  text-2xl"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  ></i>
                )}
              </h2>
              <div className="flex-1 max-w-md">
                <div className="flex items-center bg-gray-100 rounded overflow-hidden">
                  <i className="fas fa-search text-gray-400 p-2"></i>
                  <input
                    className="bg-transparent p-2 outline-none w-full"
                    placeholder="Search"
                    type="search"
                    name="search"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="flex-1">
                <select
                  name="difficulty"
                  className="bg-gray-100 p-2 rounded outline-none cursor-pointer w-full"
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="entry">Entry Level</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {renderSteps()}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default MainComponent;
