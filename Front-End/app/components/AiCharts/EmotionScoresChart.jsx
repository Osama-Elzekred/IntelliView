import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  AnnotationPlugin // Register Annotation
);

const emotionWeights = {
  neutral: 1,
  happy: 1.5,
  fear: -1,
  sad: -0.5,
};

const processData = (data) => {
  return data.map((d) => {
    const timestamp = d.time;
    const weightedScore = Object.keys(d.scores).reduce((sum, emotion) => {
      return sum + d.scores[emotion] * (emotionWeights[emotion] || 1);
    }, 0);

    return { timestamp, weightedScore };
  });
};

const EmotionChart = ({ data }) => {
  const chartData = processData(data);
  const timestamps = chartData.map((d) => d.timestamp);
  const scores = chartData.map((d) => d.weightedScore);

  const dataConfig = {
    labels: timestamps,
    datasets: [
      {
        label: 'Emotion Score Over Time',
        data: scores,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Emotion Scores Over Time',
      },
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xMin: 0,
            xMax: 120,
            yMin: -1,
            yMax: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderWidth: 0,
          },
          box2: {
            type: 'box',
            xMin: 0,
            xMax: 120,
            yMin: 0,
            yMax: 1,
            backgroundColor: 'rgba(54, 162, 235, 0.25)',
            borderWidth: 0,
          },
          box3: {
            type: 'box',
            xMin: 0,
            xMax: 120,
            yMin: 1,
            yMax: 1.5,
            backgroundColor: 'rgba(75, 192, 192, 0.25)',
            borderWidth: 0,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Seconds',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Fear <--    Neutral    --> Happy',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={dataConfig} options={options} />
    </div>
  );
};

export default EmotionChart;
