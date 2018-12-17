import React from 'react';
import { Bar } from 'react-chartjs-2';

const WeeklyUsageChart = ({ data }) => (
  <div>
    <h2>Total Equipment Usage Grouped By Day of the Week</h2>
    <Bar
      data={data}
      width={600}
      height={450}
    />
  </div>
);

export default WeeklyUsageChart;
