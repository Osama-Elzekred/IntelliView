'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import config from '../../../../config';


function MainComponent() {
  const [modalVisible, setTopicModalVisible] = useState(false);
  const [topics, setTopics] = useState([]);
  const [interviewModalVisible, setInterviewModalVisible] = useState(false);
  const [InterviewQuestions, setInterviewQuestions] = React.useState([
    { Question: '', ModelAnswer: '' },
  ]);
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
  const { DOMAIN_NAME } = config;
  const addVideoField = () => {
    setInterviewQuestions([
      ...InterviewQuestions,
      { Question: '', ModelAnswer: '' },
    ]);
  };
  const fetchTopics = async () => {
    fetch(`https://${DOMAIN_NAME}/api/InterviewMock/allInterviewTopics`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTopics(data);
        // //console.log(data);
      })
      .catch((error) =>
        console.error(
          'There has been a problem with your fetch operation:',
          error
        )
      );
  };
  useEffect(() => {
    fetchTopics();
  }, [topics]);
  const handleMockSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.Title.value;
    const description = e.target.Description.value;
    const topicId = e.target.topicId.value; // Assuming the select name is "topicId"
    const level = e.target.Level.value;
    const mappedInterviewQuestions = InterviewQuestions.map((video, index) => ({
      Question: e.target[`Question-${index}`].value,
      ModelAnswer: e.target[`ModelAnswer-${index}`].value,
    }));

    const mockData = {
      title,
      description,
      InterviewTopicId: parseInt(topicId),
      level,
      InterviewQuestions: mappedInterviewQuestions,
    };
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/InterviewMock/AddInterviewMock`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authTokenCookie}`,
          },
          body: JSON.stringify(mockData),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      });
      // Continue processing the response
      // setInterviewModalVisible(false);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
    e.target.Title.value = '';
    e.target.Description.value = '';
    e.target.topicId.value = '';
    e.target.Level.value = '';
    setInterviewQuestions([{ Question: '', ModelAnswer: '' }]);
  };
  const handleTopicSubmit = (e) => {
    e.preventDefault();
    const topic = e.target.Topic.value;
    const description = e.target.Description.value;
    let iconClass = e.target.IconClass.value;
    if (iconClass === null || iconClass === '' || iconClass === undefined) {
      iconClass = IconClasses[Math.floor(Math.random() * IconClasses.length)];
    }
    const addJobDto = {
      topic: topic,
      description: description,
      iconClass: iconClass,
    };
    try {
      const response = fetch(
        `https://${DOMAIN_NAME}/api/InterviewMock/AddInterviewTopic/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authTokenCookie}`,
          },
          body: JSON.stringify(addJobDto),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Continue processing the response
      });
    } catch (error) {
      console.error('Failed to submit the form', error);
    }
    e.target.Topic.value = '';
    e.target.Description.value = '';
    e.target.IconClass.value = '';
    fetchTopics();
    // setModalVisible(false);
  };
  return (
    <div className="relative flex flex-1 justify-center items-center m-4">
      <button
        onClick={() => setTopicModalVisible(true)}
        className="bg-[#007BFF] text-white p-2 rounded mb-4"
      >
        Add Interview Topic
      </button>
      <button
        onClick={() => setInterviewModalVisible(true)}
        className="bg-[#28a745] text-white p-2 rounded mb-4 ml-4"
      >
        Add Interview Mock
      </button>
      {modalVisible && (
        <div className="fixed inset-0 bg-[#00000080] flex justify-center items-center">
          <div className="w-full max-w-[600px] mx-auto p-5 bg-[#F0F0F0] rounded">
            <form className="space-y-4" onSubmit={handleTopicSubmit}>
              <button
                onClick={() => setTopicModalVisible(false)}
                className="bg-red-500 text-white p-2 rounded mb-4 float-right"
              >
                X
              </button>
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Topic
                </label>
                <input
                  type="text"
                  name="Topic"
                  id="topic"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Description
                </label>
                <textarea
                  name="Description"
                  id="description"
                  rows="4"
                  className="mt-1 p-2 w-full border rounded"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="iconClass"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Icon Class (Font Awesome)
                </label>
                <input
                  type="text"
                  name="IconClass"
                  id="iconClass"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="e.g., fa-solid fa-coffee"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-[#007BFF] text-white p-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {interviewModalVisible && (
        <div className="fixed inset-0 bg-[#00000080] flex justify-center items-center overflow-auto">
          <div className="w-full max-w-lg mx-auto p-5 bg-[#F0F0F0] rounded">
            <form
              className="space-y-4 overflow-auto max-h-[500px]"
              onSubmit={handleMockSubmit}
            >
              <button
                onClick={() => setInterviewModalVisible(false)}
                className="bg-red-500 text-white p-2 rounded mb-4 float-right"
              >
                X
              </button>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="Title"
                  id="title"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="interviewDescription"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Description
                </label>
                <textarea
                  name="Description"
                  id="interviewDescription"
                  rows="4"
                  className="mt-1 p-2 w-full border rounded"
                ></textarea>
              </div>
              <div className="mt-1 p-2 w-full border rounded">
                <select
                  name="topicId"
                  className="mt-1 p-2 w-full border rounded"
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={topic.id}>
                      {topic.topic}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-roboto text-[#333]"
                >
                  Level
                </label>
                <select
                  name="Level"
                  id="level"
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="1">Entry Level</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Expert</option>
                </select>
              </div>
              {InterviewQuestions.map((video, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <label
                      htmlFor={`Question-${index}`}
                      className="block text-sm font-roboto text-[#333]"
                    >
                      Question{`-${index}`}
                    </label>
                    <input
                      type="text"
                      name={`Question-${index}`}
                      id={`question-${index}`}
                      className="mt-1 p-2 w-full border rounded"
                      value={video.Question}
                      onChange={(e) => {
                        const newInterviewQuestions = [...InterviewQuestions];
                        newInterviewQuestions[index].Question = e.target.value;
                        setInterviewQuestions(newInterviewQuestions);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`ModelAnswer-${index}`}
                      className="block text-sm font-roboto text-[#333]"
                    >
                      Model Answer{`-${index}`}
                    </label>
                    <input
                      type="text"
                      name={`ModelAnswer-${index}`}
                      id={`modelAnswer-${index}`}
                      className="mt-1 p-2 w-full border rounded"
                      value={video.ModelAnswer}
                      onChange={(e) => {
                        const newInterviewQuestions = [...InterviewQuestions];
                        newInterviewQuestions[index].ModelAnswer =
                          e.target.value;
                        setInterviewQuestions(newInterviewQuestions);
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addVideoField}
                className="mt-4 bg-[#28a745] text-white p-2 rounded block"
              >
                Add Interview Question
              </button>
              <button
                type="submit"
                className="mt-4 w-full bg-[#28a745] text-white p-2 rounded"
              >
                Add Interview Mock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;
