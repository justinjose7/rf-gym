import React from 'react';
import LoginRegister from './loginRegister';
import EquipmentTable from './equipmentTable';
import './index.css';

const DefaultHome = () => (

  <div className="container-default-home">
    <EquipmentTable />
    <LoginRegister />
  </div>
);

export default DefaultHome;
