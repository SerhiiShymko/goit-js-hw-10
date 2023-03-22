import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const inputSearch = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

inputSearch.addEventListener('input', e => {
  e.preventDefault();
  searchValue = e.target.value.trim();
  fetchCountries(searchValue)
    .then(response => {
      //render
    })
    .catch(error => console.error(error));
});
