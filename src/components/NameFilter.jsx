import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function NameFilter() {
  const {
    filterByName: { name },
    setInput,
  } = useContext(planetsContext);

  return (
    <label htmlFor="name-filter">
      Name:
      <input
        type="text"
        data-testid="name-filter"
        id="name-filter"
        onChange={ ({ target }) => setInput(target.value) }
        value={ name }
      />
    </label>
  );
}

export default NameFilter;
