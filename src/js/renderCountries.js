class countries {
  constructor(name, capital, population, languages, flags) {
    this.name = name;
    this.capital = capital;
    this.population = population;
    this.languages = languages;
    this.flags = flags;
  }
}

const createColection = (countries, count) => {
  const collection = countries.slice(0, count);
  return collection.map(
    ({ name, capital, population, languages, flags }) =>
      new countries(name, capital, population, languages, flags)
  );
};

const renderCountries = collection => {
  const countryContainer = document.querySelector('.country-list');
  countryContainer.innerHTML = '';
  const country = collection.map(countryCard => {
    const li = document.createElement('li');
    li.classList.add('country-items');

    return li;
  });
  countryContainer.append(...country);
};

export { createColection, renderCountries };
