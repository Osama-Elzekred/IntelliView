import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SentimentScoreChart = ({ sentimentScore }) => {
  // sentimentScore = -1;
  // Convert sentimentScore to a percentage for visualization
  const positiveScore = sentimentScore > 0 ? sentimentScore * 100 : 0;
  const negativeScore = sentimentScore < 0 ? Math.abs(sentimentScore) * 100 : 0;
  const neutralScore = sentimentScore === 0 ? 100 : 0;

  const data = {
    labels: ['Sentiment Score'],
    datasets: [
      {
        label: 'Negative',
        data: [negativeScore],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Neutral',
        data: [neutralScore],
        backgroundColor: 'rgba(201, 203, 207, 0.5)',
      },
      {
        label: 'Positive',
        data: [positiveScore],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return `${value}%`;
          },
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SentimentScoreChart;
