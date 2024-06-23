import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SimilarityScoreChart = ({ similarityScore }) => {
  const formatSimilarityScore = (similarityScore) => {
    // Assuming similarityScore is a single value, you might need to adjust this
    // to fit how you want to display the similarity score over time.
    const data = {
      labels: ['Similarity Score'],
      datasets: [
        {
          label: 'Score',
          data: [similarityScore],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    return data;
  };

  return (
    <div>
      <h2>Answer Similarity Score</h2>
      <Line data={formatSimilarityScore(similarityScore)} />
    </div>
  );
};

export default SimilarityScoreChart;
