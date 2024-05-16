function VideoReview({ resumeScore, workmapScores, videoScores }) {
  return (
    <div className="flex justify-around p-4 bg-white shadow-md rounded-lg w-full">
      {/* <div className="w-[200px] flex flex-col items-center">
        <InterviewScoreDisplay
          overall={resumeScore?.overall ?? resumeScore}
          indicators={[
            resumeScore?.overall ?? 1,
            resumeScore?.skills ?? 1,
            resumeScore?.education ?? 1,
            resumeScore?.experience ?? 1,
          ]}
        />
        <div className="text-center mt-2">
          <p className="font-bold">Resume Score</p>
          <div className="flex justify-around text-xs">
            <span className="text-blue-500">Overall</span>
            <span className="text-purple-500">Skills</span>
            <span className="text-red-500">Education</span>
            <span className="text-orange-500">Experience</span>
          </div>
        </div>
      </div> */}

      <div className="w-[300px]">
        <div className="text-center font-bold mb-2">Workmap Score</div>
        <div className="grid grid-cols-3 gap-3">
          {workmapScores.map((score, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${score.color}` }}
              >
                {score.value}
              </div>
              <span className="mt-1 text-xs">{score.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[300px]">
        <div className="text-center font-bold mb-2">AI Video Score</div>
        {videoScores.map((score, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="w-1/2 text-xs">{score.label}</span>
            <div className="w-1/2 flex items-center">
              <div className="h-2 w-full bg-gray-200 mr-2">
                <div
                  style={{
                    width: `${score.value}%`,
                    backgroundColor: score.color,
                  }}
                  className="h-full"
                ></div>
              </div>
              <span className="text-xs">{score.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryComponent() {
  const resumeScore = {
    overall: 40,
    skills: 25,
    education: 30,
    experience: 5,
  };

  const workmapScores = [
    { label: 'Interpersonal', value: 2.5, color: '#D6D6F7' },
    { label: 'Analytical', value: 2.5, color: '#FECACA' },
    { label: 'Time Management', value: 2.5, color: '#FECACA' },
    { label: 'Communication', value: 3.4, color: '#CBF7ED' },
    { label: 'Mathematics', value: 4.9, color: '#FDF5C4' },
  ];

  const videoScores = [
    { label: 'Professionalism', value: 75, color: '#3B82F6' },
    { label: 'Energy Levels', value: 80, color: '#FBBF24' },
    { label: 'Communication', value: 72, color: '#EF4444' },
    { label: 'Sociability', value: 65, color: '#F472B6' },
  ];

  return (
    <div className="p-4">
      <VideoReview
        resumeScore={resumeScore}
        workmapScores={workmapScores}
        videoScores={videoScores}
      />
    </div>
  );
}

export default StoryComponent;

function InterviewScoreDisplay({ overall, indicators }) {
  const totalIndicators = indicators.length;
  const layerStyles = (index) => {
    const size = 200 + index * 30;
    const color = `rgba(0, 0, 255, ${(index + 1) / totalIndicators})`;
    return `w-[${size}px] h-[${size}px] border-[15px] border-[${color}] rounded-full flex items-center justify-center absolute`;
  };

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      {indicators.map((_, index) => (
        <div key={index} className={layerStyles(index)}></div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[40px] font-bold font-sans">
        {overall}%
      </div>
    </div>
  );
}

function StoryComponent2() {
  return (
    <div className="flex gap-4">
      <MainComponent overall={85} indicators={[1, 1, 1]} />
      <MainComponent overall={72} indicators={[1, 1, 1, 1]} />
    </div>
  );
}
