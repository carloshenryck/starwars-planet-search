/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import filterPlanets from '../utils/filterPlanets';

function PlanetsProvider({ children }) {
  console.log('renderizei o Provider');
  const [planets, setPlanets] = useState([]);
  const [name, setInput] = useState('');
  const [filterOptions, setFilterOption] = useState([]);
  const [filteredPlanets, setfilteredPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((planet) => delete planet.residents);
        setPlanets(data.results);
      });
  }, []);

  useEffect(() => {
    const newFilteredPlanets = filterPlanets(planets, name, filterOptions);
    setfilteredPlanets(newFilteredPlanets);
  }, [name, filterOptions]);

  const info = {
    planets,
    filteredPlanets,
    filterByName: { name },
    filterByNumericValues: filterOptions,
    setInput,
    setFilterOption,
  };

  return (
    <PlanetsContext.Provider value={ info }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.array,
}.isRequired;

export default PlanetsProvider;
