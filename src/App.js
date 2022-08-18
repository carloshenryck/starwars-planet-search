import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';

import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Project</h1>
      <NameFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
