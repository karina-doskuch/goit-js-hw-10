export function countryMarkupTemplate({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  return `
      <div>
        <div class="country-wrapper">
          <img class="country-img" src="${flags.svg}" alt="${name.official}">
          <h2>${name.official}</h2>
        </div>
        <p><span>Capital:</span> ${capital}</p>
        <p><span>Population:</span> ${population}</p>
        <p><span>Languages:</span> ${Object.values(languages)}</p>
      </div>
    `;
}

export function countryMarkupListTemplate({ name, flags }) {
  return `
    <li class="countries-item">
      <img class="country-img" src="${flags.svg}" alt="${name.official}">
      <h2>${name.official}</h2>
    </li>
    `;
}
