const generateMarkupCountryInfo = data =>
  data.reduce((acc, { flags, name, capital, population, languages }) => {
    languages = Object.values(languages).join(', ');
    return (
      acc +
      `
            <div class = "country-wrapper">
                <div class = "country-flag-wrapper">
                 <img class = "country-flag" src = "${flags.svg}" alt = "${name.official}">
                </div>
                <p class = "country-name"> ${name.common} </p>
            </div>
            <p class="country-capital">Capital:<span class="bold-text">${capital}</span> </p>
            <p class="country-population">Population:<span class="bold-text">${population}</span> </p>
            <p class="country-languages">Languages:<span class="bold-text">${languages}</span> </p>`
    );
  }, '');

const generateMarkupCountryList = data =>
  data.reduce((acc, { flags, name }) => {
    return (
      acc +
      `<li class="country-list__item">
        <div class="country-list__image">
        <img src="${flags.svg}" alt="${name.official}" width="70">
                        </div>
        <span class="country-list__name">${name.common}</span>
      </li>`
    );
  }, '');

function addMarkup(markup, element) {
  element.insertAdjacentHTML('beforeend', markup);
}

export { generateMarkupCountryInfo, generateMarkupCountryList, addMarkup };
