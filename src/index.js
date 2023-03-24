import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import {
  generateMarkupCountryInfo,
  generateMarkupCountryList,
  addMarkup,
} from './js/markupCountries';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 5000,
  clickToClose: true,
  cssAnimationStyle: 'from-left',
};
const body = document.querySelector('body');
body.style.backgroundImage =
  'linear-gradient(90deg, rgba(136,255,0,0.024229760263480338) 0%, rgba(9,9,121,1) 100%, rgba(2,0,36,1) 100%)';

inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const searchValue = event.target.value.trim();
  updateUI();
  if (!searchValue) return;

  fetchCountries(searchValue)
    .then(data => {
      if (data.length === 1) {
        const markup = generateMarkupCountryInfo(data);
        addMarkup(markup, countryInfo);
      }

      if (data.length >= 2 && data.length <= 10) {
        const markup = generateMarkupCountryList(data);
        addMarkup(markup, countryList);
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          options
        );
      }
    })
    .catch(error =>
      Notify.failure('Oops, there is no country with that name', options)
    );
}

function updateUI() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
