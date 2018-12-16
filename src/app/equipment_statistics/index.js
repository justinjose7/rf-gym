import React from 'react';
import PopularEquipmentTableContainer from './popularEquipmentTable';
import WeeklyUsageChartContainer from './weeklyUsageChart';
import './index.css';

const EquipmentStatistics = () => (
  <div className="statistics-container">
    <PopularEquipmentTableContainer />
    <WeeklyUsageChartContainer />
  </div>
);

export default EquipmentStatistics;
