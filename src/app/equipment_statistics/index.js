import React from 'react';
import PopularEquipmentTableContainer from './popularEquipmentTable';
import WeeklyUsageChartContainer from './weeklyUsageChart';
import HourlyUsageChartContainer from './hourlyUsageChart';

import './index.css';

const EquipmentStatistics = () => (
  <div className="statistics-container">
    <PopularEquipmentTableContainer />
    <WeeklyUsageChartContainer />
    <HourlyUsageChartContainer />
  </div>
);

export default EquipmentStatistics;
