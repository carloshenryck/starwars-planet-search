import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setInput] = useState('');
  const filteredPlanets = name.length > 0
    ? planets.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
    : [];

  const info = {
    planets,
    filteredPlanets,
    name,
    setInput,
  };

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((planet) => delete planet.residents);
        setPlanets(data.results);
      });
  }, []);

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
