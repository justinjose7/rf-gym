import React from 'react';
import { Bar } from 'react-chartjs-2';

const HourlyUsageChart = ({ data }) => (
  <div>
    <h2>Total Equipment Usage Grouped By Hour of the Day</h2>
    <Bar
      data={data}
      width={600}
      height={485}
    />
  </div>
);

export default HourlyUsageChart;
