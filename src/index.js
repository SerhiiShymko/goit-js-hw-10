import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
// import { createColection, renderCountries } from './js/renderCountries';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 2000,
  clickToClose: true,
  cssAnimationStyle: 'from-left',
};

inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();

  if (!value) {
    addHidden();
    clearInterfaceUI();
    return;
  }

  const value = inputSearch.value.trim();
  console.log(value);
  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          options
        );
      }
      // renderCountries(data);
      renderCountries(createColection(data.countryCard));
    })
    .catch(err => {
      // clearInterfaceUI();
      Notify.failure('Oops, there is no country with that name', options);
    });
}

// function onInputSearch(e) {
//   const value = searchBox.value.trim();
//   console.log(value);

//   if (!value) {
//     addHidden();
//     clearInterfaceUI();
//     return;
//   }

//   fetchCountries(value)
//     .then(data => {
//       if (data.length > 10) {
//         Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       }
//       renderCountries(data);
//     })
//     .catch(err => {
//       clearInterfaceUI();
//       Notify.failure('Oops, there is no country with that name');
//     });
// }

// const generateMarkupCountryInfo = data =>
//   data.reduce(
//     (acc, { flags: { svg }, name, capital, population, languages }) => {
//       console.log(languages);
//       languages = Object.values(languages).join(', ');
//       console.log(name);
//       return (
//         acc +
//         ` <img src="${svg}" alt="${name}" width="320" height="auto">
//             <p> ${name.official}</p>
//             <p>Capital: <span> ${capital}</span></p>
//             <p>Population: <span> ${population}</span></p>
//             <p>Languages: <span> ${languages}</span></p>`
//       );
//     },
//     ''
//   );

// const generateMarkupCountryList = data =>
//   data.reduce((acc, { name: { official, common }, flags: { svg } }) => {
//     return (
//       acc +
//       `<li>
//         <img src="${svg}" alt="${common}" width="70">
//         <span>${official}</span>
//       </li>`
//     );
//   }, '');

// function renderCountries(result) {
//   if (result.length === 1) {
//     countriesList.innerHTML = '';
//     countriesList.style.visibility = 'hidden';
//     countryInfo.style.visibility = 'visible';
//     countryInfo.innerHTML = generateMarkupCountryInfo(result);
//   }
//   if (result.length >= 2 && result.length <= 10) {
//     countryInfo.innerHTML = '';
//     countryInfo.style.visibility = 'hidden';
//     countriesList.style.visibility = 'visible';
//     countriesList.innerHTML = generateMarkupCountryList(result);
//   }
// }

// function clearInterfaceUI() {
//   countriesList.innerHTML = '';
//   countryInfo.innerHTML = '';
// }

// function addHidden() {
//   countriesList.style.visibility = 'hidden';
//   countryInfo.style.visibility = 'hidden';
// }
