import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { countryMarkupTemplate, countryMarkupListTemplate } from './js/markup.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');

searchBox.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
  const countryName = searchBox.value.trim();
  if (countryName === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
      }

      if (countries.length >= 2 && countries.length <= 10) {
        const markupList = countries.map(country =>
            countryMarkupListTemplate(country)
        );
        countryList.innerHTML = markupList.join('');
        countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markupCountriesLength = countries.map(country => countryMarkupTemplate(country));
        countryInfo.innerHTML = markupCountriesLength.join('');
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      return error;
    });
}
