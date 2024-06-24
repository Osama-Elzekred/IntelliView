import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns'; // Import the date adapter

const EmotionScoresChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS", // Correct format with date-fns
          tooltipFormat: 'MM/dd/yyyy HH:mm',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };

  const formattedData = {
    labels: data.map((entry) => entry.timestamp),
    datasets: [
      {
        label: 'Neutral',
        data: data
          .filter((entry) => entry.scores.neutral !== undefined)
          .map((entry) => ({ x: entry.timestamp, y: entry.scores.neutral })),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Happy',
        data: data
          .filter((entry) => entry.scores.happy !== undefined)
          .map((entry) => ({ x: entry.timestamp, y: entry.scores.happy })),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Fear',
        data: data
          .filter((entry) => entry.scores.fear !== undefined)
          .map((entry) => ({ x: entry.timestamp, y: entry.scores.fear })),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Sad',
        data: data
          .filter((entry) => entry.scores.sad !== undefined)
          .map((entry) => ({ x: entry.timestamp, y: entry.scores.sad })),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return <Line className="" data={formattedData} options={options} />;
};

export default EmotionScoresChart;
