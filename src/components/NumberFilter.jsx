import React, { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

function NumberFilter() {
  const { filterByNumericValues, setFilterOption } = useContext(planetsContext);
  const [value, setValue] = useState('0');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');

  const newFilterOption = {
    column,
    comparison,
    value,
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    if (name === 'value') setValue(target.value);
    if (name === 'column') setColumn(target.value);
    if (name === 'comparison') setComparison(target.value);
  };

  return (
    <>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
        value={ column }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange }
        value={ comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        value={ value }
        data-testid="value-filter"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterOption([...filterByNumericValues, newFilterOption]) }
      >
        Filtrar
      </button>
    </>
  );
}

export default NumberFilter;
