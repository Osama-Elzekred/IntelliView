import React from 'react';
import EmotionScoresChart from './EmotionScoresChart';
import SimilarityScoreChart from './SimilarityScoreChart';
import SentimentScoreChart from './SentimentScoreChart';
import { Rating, Card } from 'flowbite-react';
import { Alert } from './../components';
const AICharts = ({ aiScores }) => {
  return (
    <div className="flex flex-col space-y-1 ">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Adjust flex direction and spacing for different screen sizes */}
        <Card className="w-full sm:w-3/4 md:w-2/3 lg:w-2/3 xl:w-2/3">
          <EmotionScoresChart data={aiScores.emotionScores} />
        </Card>
        <div className="flex flex-col w-full sm:w-1/4 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <Card className="p-2 w-full mb-4">
            {/* Display sentiment score */}
            <h5 className="text-lg font-bold text-center">Sentiment Score</h5>
            <SentimentScoreChart sentimentScore={aiScores.sentimentScore} />
          </Card>
          <Card className="p-2 w-full">
            {/* Adjust width for larger screens to control the size of the cards */}
            <SimilarityScoreChart
              similarityScore={aiScores.answerSimilarityScore}
            />
          </Card>
        </div>
      </div>
      <Alert
        Color={'green'}
        Message={aiScores.recommendationText}
        title="Ai Recommendation"
      />
    </div>
  );
};

export default AICharts;
