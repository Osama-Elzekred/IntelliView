import React from 'react';
import EmotionScoresChart from './EmotionScoresChart';
import SimilarityScoreChart from './SimilarityScoreChart';
import { Rating, Card } from 'flowbite-react';

const AICharts = ({ aiScores }) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Adjust flex direction and spacing for different screen sizes */}
      <Card className="w-full sm:w-3/4 md:min-w-[80%] md:flex-3 lg:w-3/4 xl:w-3/4">
        <EmotionScoresChart data={aiScores.emotionScores} />
      </Card>
      <div className="flex flex-col space-y-1 w-full sm:w-1/4">
        <Card className="p-4 w-full">
          {/* Adjust width for larger screens to control the size of the cards */}
          <SimilarityScoreChart
            similarityScore={aiScores.answerSimilarityScore}
          />
        </Card>
        <Card className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
          {/* Display sentiment score */}
          <h5 className="text-lg font-bold justify-center items-center text-center">
            Sentiment Score
          </h5>
          <div className="flex flex-grow justify-center items-center text-center">
            <div>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {aiScores.sentimentScore}
                </p>
              </Rating>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AICharts;
