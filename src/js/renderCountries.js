// const createColection = (countries, count) => {
//   const collection = countries.slice(0, count);
//   return collection.map(
//     ({ name, capital, population, languages, flags }) =>
//       new countries(name, capital, population, languages, flags)
//   );
// };

// const renderCountries = collection => {
//   const countryContainer = document.querySelector('.country-list');
//   countryContainer.innerHTML = '';
//   const country = collection.map(countryCard => {
//     const li = document.createElement('li');
//     li.classList.add('country-items');

//     return li;
//   });
//   countryContainer.append(...country);
// };
// ///////////////////////////////////////////////////////////////
const generateMarkupCountryInfo = data =>
  data.reduce(
    (acc, { flags: { svg }, name, capital, population, languages }) => {
      // console.log(languages);
      languages = Object.values(languages).join(', ');
      console.log(name);
      return (
        acc +
        ` <img src="${svg}" alt="${name}" width="320" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`
      );
    },
    ''
  );

const generateMarkupCountryList = data =>
  data.reduce((acc, { name: { official, common }, flags: { svg } }) => {
    return (
      acc +
      `<li>
        <img src="${svg}" alt="${common}" width="70">
        <span>${official}</span>
      </li>`
    );
  }, '');

export default function renderCountries(result) {
  if (result.length === 1) {
    countriesList.innerHTML = '';
    countriesList.style.visibility = 'hidden';
    countriesInfo.style.visibility = 'visible';
    countriesInfo.innerHTML = generateMarkupCountryInfo(result);
  }
  if (result.length >= 2 && result.length <= 10) {
    countriesInfo.innerHTML = '';
    countriesInfo.style.visibility = 'hidden';
    countriesList.style.visibility = 'visible';
    countriesList.innerHTML = generateMarkupCountryList(result);
  }
}

// export default { renderCountries };
