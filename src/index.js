import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { renderCountries } from './js/renderCountries';

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
  const value = inputSearch.value.trim();
  console.log(value);

  if (!value) {
    countriesList.style.visibility = 'hidden';
    countriesInfo.style.visibility = 'hidden';
    countriesList.innerHTML = '';
    countriesInfo.innerHTML = '';
    return;
  }

  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          options
        );
      }
      renderCountries(data);
    })
    .catch(error => {
      countriesList.innerHTML = '';
      countriesInfo.innerHTML = '';
      Notify.failure('Oops, there is no country with that name', options);
    });
}
