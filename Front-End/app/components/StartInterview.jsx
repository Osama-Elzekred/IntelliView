'use client';
import React from 'react';

function StartInterview({
  title,
  subtitle,
  startButtonText,
  onInitiateConversation,
}) {
  const [loading, setLoading] = React.useState(false);
  const [chatResponse, setChatResponse] = React.useState('');

  const handleStartClick = async () => {
    setLoading(true);
    const data = await onInitiateConversation();
    setChatResponse(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F0F4F8]">
      <img
        // src={imageUrl}
        src="/images/info_graphic_1.svg"
        alt="image"
        // className="w-50 h-60"
        // alt="Welcome image for virtual interview"
        className="w-[400px] h-[400px] mb-4 object-cover rounded-lg bg-transparent"
      />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold font-roboto text-[#123456]">
          {title}
        </h1>
        <p className="mb-4 text-lg font-roboto text-[#555]">{subtitle}</p>
        {chatResponse && (
          <p className="mb-4 text-lg font-roboto text-[#555]">{chatResponse}</p>
        )}
        <button
          onClick={handleStartClick}
          disabled={loading}
          className="px-6 py-2 bg-[#1E90FF] text-white font-roboto rounded hover:bg-[#1C86EE] transition duration-150 disabled:bg-[#aaa]"
        >
          {loading ? 'Please Wait...' : startButtonText}
        </button>
      </div>
    </div>
  );
}

function StoryComponent() {
  const initiateConversation = async () => {
    const response = await fetch(
      'https://www.create.xyz/integrations/chat-gpt/conversationgpt4',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Starting Virtual Interview',
            },
          ],
          system_prompt: 'Prepare for Virtual Interview',
        }),
      }
    );

    const data = await response.json();
    return data.result;
  };

  return (
    <div>
      <StartInterview
        title="Welcome to Your Virtual Interview"
        subtitle="Ensure you are in a quiet space, have a stable internet connection, and your camera and microphone are working properly."
        startButtonText="Begin Interview"
        onInitiateConversation={initiateConversation}
        imageUrl="./virtual_interview_welcome_image.jpg"
      />
    </div>
  );
}

export default StartInterview;
