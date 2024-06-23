import React from 'react';
import EmotionScoresChart from './EmotionScoresChart';
import SimilarityScoreChart from './SimilarityScoreChart';

const AICharts = ({ aiScores }) => {
  return (
    <div>
      <EmotionScoresChart emotionScores={aiScores.emotionScores} />
      <SimilarityScoreChart similarityScore={aiScores.answerSimilarityScore} />
    </div>
  );
};

export default AICharts;
