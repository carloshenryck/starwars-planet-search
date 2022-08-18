import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';

import './App.css';

function App() {
  console.log('renderizei o App');
  return (
    <PlanetsProvider>
      <h1>Star Wars Project</h1>
      <NameFilter />
      <NumberFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
