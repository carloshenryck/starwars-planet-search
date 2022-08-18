import React, { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

function NumberFilter() {
  console.log('renderizei o NumberFilter');
  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const { filterByNumericValues, setFilterOption } = useContext(planetsContext);
  const [value, setValue] = useState('0');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [filterOptions, setOptions] = useState(options);

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

  const generateOptions = () => (
    filterOptions.map((option) => (
      <option key={ option } value={ option }>{option}</option>
    ))
  );

  const removeFromFilter = (filterName) => {
    const newOptions = filterByNumericValues.filter((option) => (
      option.column !== filterName
    ));
    setFilterOption(newOptions);
  };

  const handleFilterButton = () => {
    const newOptions = filterOptions.filter((option) => option !== column);
    setOptions(newOptions);
    setColumn(newOptions[0]);
    setFilterOption([...filterByNumericValues, newFilterOption]);
  };

  const handleDeleteButton = ({ target }) => {
    const filterParent = target.parentElement;
    const filterName = filterParent.getAttribute('name');
    const newOptions = [...filterOptions, filterName];
    setOptions(newOptions);
    setColumn(filterName);
    removeFromFilter(filterName);
  };

  const removeAllFilters = () => {
    setOptions(options);
    setFilterOption([]);
  };

  return (
    <div className="numeric-filter">
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
        value={ column }
      >
        { generateOptions() }
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
        onClick={ handleFilterButton }
      >
        Filter
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remove all filters
      </button>
      {filterByNumericValues.map((filter) => (
        <div key={ filter.column } name={ filter.column } data-testid="filter">
          <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
          <button type="button" onClick={ handleDeleteButton }>delete</button>
        </div>
      ))}
    </div>
  );
}

export default NumberFilter;
