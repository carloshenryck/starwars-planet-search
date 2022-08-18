const filterByOptions = (filterOptions, planets) => {
  filterOptions.forEach((option) => {
    switch (option.comparison) {
    case 'maior que':
      planets = planets.filter(
        (planet) => (Number(planet[option.column]) > Number(option.value)),
      );
      break;
    case 'menor que':
      planets = planets.filter(
        (planet) => (Number(planet[option.column]) < Number(option.value)),
      );
      break;
    default:
      planets = planets.filter(
        (planet) => (Number(planet[option.column]) === Number(option.value)),
      );
    }
  });

  return planets;
};

export const filterPlanets = (planets, name, filterOptions) => {
  if (name.length > 0) {
    planets = planets.filter((planet) => (
      planet.name.toLowerCase().includes(name.toLowerCase())
    ));
  }

  if (filterOptions.length > 0) {
    planets = filterByOptions(filterOptions, planets);
  }

  return planets;
};

export const compareArr = (f, s) => JSON.stringify(f) === JSON.stringify(s);
