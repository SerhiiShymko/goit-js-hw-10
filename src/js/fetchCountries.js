export const fetchCountries = name => {
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
  });
  return fetch(
    `https://restcountries.com/v3.1/name/?${params.toString()}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status === 404);
    }
    return response.json();
  });
};

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const searchParams = new URLSearchParams({
//   fields: 'name,capital,population,flags,languages,',
// });

// export const fetchCountries = name => {
//   return fetch(`${BASE_URL}${name}?${searchParams}`).then(response => {
//     if (response.status === 404) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };
