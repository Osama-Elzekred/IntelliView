'use client';
import React from 'react';
import { useState, useEffect } from 'react';

function MainComponent() {
  const [modalVisible, setTopicModalVisible] = useState(false);
  const [topics, setTopics] = useState([]);
  const [interviewModalVisible, setInterviewModalVisible] = useState(false);
  const [videos, setVideos] = React.useState([{ ContentText: '', Url: '' }]);

  const addVideoField = () => {
    setVideos([...videos, { ContentText: '', Url: '' }]);
  };
  const fetchTopics = async () => {
    fetch('https://localhost:7049/api/InterviewMock/allInterviewTopics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTopics(data);
        // console.log(data);
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
  }, []);
  const handleMockSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.Title.value;
    const description = e.target.Description.value;
    const topicId = e.target.topicId.value; // Assuming the select name is "topicId"
    const level = e.target.Level.value;
    const mappedVideos = videos.map((video, index) => ({
      contentText: e.target[`ContentText-${index}`].value,
      url: e.target[`Url-${index}`].value,
    }));

    const mockData = {
      title,
      description,
      InterviewTopicId: parseInt(topicId),
      level,
      Videos: mappedVideos,
    };
    try {
      const response = await fetch(
        'https://localhost:7049/api/InterviewMock/AddInterviewMock',
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
    setVideos([{ ContentText: '', Url: '' }]);
  };
  const handleTopicSubmit = (e) => {
    e.preventDefault();
    const topic = e.target.Topic.value;
    const description = e.target.Description.value;
    const iconClass = e.target.IconClass.value;
    const addJobDto = {
      topic: topic,
      description: description,
      iconClass: iconClass,
    };
    try {
      const response = fetch(
        `https://localhost:7049/api/InterviewMock/AddInterviewTopic/`,
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
                  <option value="EntryLevel">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              {videos.map((video, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <label
                      htmlFor={`contentText-${index}`}
                      className="block text-sm font-roboto text-[#333]"
                    >
                      Content{`-${index}`}
                    </label>
                    <input
                      type="text"
                      name={`ContentText-${index}`}
                      id={`contentText-${index}`}
                      className="mt-1 p-2 w-full border rounded"
                      value={video.ContentText}
                      onChange={(e) => {
                        const newVideos = [...videos];
                        newVideos[index].ContentText = e.target.value;
                        setVideos(newVideos);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`url-${index}`}
                      className="block text-sm font-roboto text-[#333]"
                    >
                      URL{`-${index}`}
                    </label>
                    <input
                      type="text"
                      name={`Url-${index}`}
                      id={`url-${index}`}
                      className="mt-1 p-2 w-full border rounded"
                      value={video.Url}
                      onChange={(e) => {
                        const newVideos = [...videos];
                        newVideos[index].Url = e.target.value;
                        setVideos(newVideos);
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
                Add Video
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
