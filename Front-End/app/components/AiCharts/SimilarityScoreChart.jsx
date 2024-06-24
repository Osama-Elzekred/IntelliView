import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SimilarityScoreChart = ({ similarityScore }) => {
  similarityScore = similarityScore * 100;
  const formatSimilarityScore = (similarityScore) => {
    const data = {
      labels: ['Similarity Score', 'Remaining'],
      datasets: [
        {
          label: 'Score',
          data: [similarityScore, 100 - similarityScore], // Assuming score is out of 100
          backgroundColor: [
            'rgb(75, 192, 192)',
            'rgba(211, 211, 211, 0.5)', // Light grey for the remaining part
          ],
          borderColor: ['rgb(75, 192, 192)', 'rgba(211, 211, 211, 0.5)'],
          borderWidth: 1,
          cutout: '80%',
        },
      ],
    };

    return data;
  };

  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const { width, height } = chart;
      const text = `${similarityScore}%`; // Text to display
      ctx.save();
      ctx.font = '16px Arial';
      ctx.fillStyle = 'rgb(75, 192, 192)';
      ctx.textBaseline = 'middle';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };

  const options = {
    rotation: 270, // Start from top
    circumference: 180, // Make a semi-circle
    cutoutPercentage: 80,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div>
      <h2>Answer Similarity Score</h2>
      <Doughnut
        data={formatSimilarityScore(similarityScore)}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default SimilarityScoreChart;
