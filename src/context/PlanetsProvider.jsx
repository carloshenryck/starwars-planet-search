import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
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
    let nPlanets = planets;

    if (name.length > 0) {
      nPlanets = nPlanets.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
    }

    if (filterOptions.length > 0) {
      filterOptions.forEach((option) => {
        switch (option.comparison) {
        case 'maior que':
          nPlanets = nPlanets.filter(
            (planet) => (Number(planet[option.column]) > Number(option.value)),
          );
          break;
        case 'menor que':
          nPlanets = nPlanets.filter(
            (planet) => (Number(planet[option.column]) < Number(option.value)),
          );
          break;
        default:
          nPlanets = nPlanets.filter(
            (planet) => (Number(planet[option.column]) === Number(option.value)),
          );
        }
      });
    }

    if (JSON.stringify(nPlanets) !== JSON.stringify(planets)) {
      setfilteredPlanets(nPlanets);
    } else {
      setfilteredPlanets([]);
    }
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
