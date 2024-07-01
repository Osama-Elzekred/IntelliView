import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SimilarityScoreChart = ({ similarityScore }) => {
  // Map similarityScore from [-1, 1] to [0, 100]
  similarityScore = -0.6;
  var similarityScoretext = similarityScore * 100;
  similarityScore = ((similarityScore + 1) / 2) * 100;
  const isScoreBelowZero = similarityScoretext < 0;

  const formatSimilarityScore = (similarityScore) => {
    const data = {
      labels: ['Similarity Score', 'Remaining'],
      datasets: [
        {
          label: 'Score',
          data: [similarityScore, 100 - similarityScore], // Now correctly assumes score is out of 100
          backgroundColor: [
            isScoreBelowZero ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
            'rgba(211, 211, 211, 0.5)',
          ],
          borderColor: [
            isScoreBelowZero ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
            'rgba(211, 211, 211, 0.5)',
          ],
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
      // Adjust text to display the mapped similarity score with 2 decimal places
      const text = `${similarityScoretext}%`;
      ctx.save();
      ctx.font = '16px Arial';
      (ctx.fillStyle = isScoreBelowZero
        ? 'rgb(255, 99, 132)'
        : 'rgb(75, 192, 192)'),
        'rgba(211, 211, 211, 0.5)';
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
