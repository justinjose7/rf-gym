import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Minutes used',
      backgroundColor: 'rgba(255,0,0,0.4)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const WeeklyUsageChart = () => (
  <div>
    <h2>Total Equipment Usage Per Day of the Week</h2>
    <Bar
      data={data}
      width={600}
      height={450}
    />
  </div>
);

export default WeeklyUsageChart;
