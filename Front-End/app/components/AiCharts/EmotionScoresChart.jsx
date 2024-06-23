import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EmotionScoresChart = ({ emotionScores }) => {
  const formatEmotionScores = (emotionScores) => {
    const labels = emotionScores.map((score) =>
      new Date(score.timestamp).toLocaleTimeString()
    );
    const data = {
      labels,
      datasets: [],
    };

    const emotions = [
      ...new Set(emotionScores.flatMap((score) => Object.keys(score.scores))),
    ];

    emotions.forEach((emotion) => {
      data.datasets.push({
        label: emotion,
        data: emotionScores.map((score) => score.scores[emotion] || 0),
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1,
      });
    });

    return data;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h2>Emotion Scores Over Time</h2>
      <Line data={formatEmotionScores(emotionScores)} />
    </div>
  );
};

export default EmotionScoresChart;
