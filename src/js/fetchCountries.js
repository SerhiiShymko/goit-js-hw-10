export const fetchCountries = search => {
  const params = new URLSearchParams({
    fields: 'name.official,capital,population,flags,languages,',
  });
  return fetch(`https://restcountries.com/v3.1/all?${params.toString()}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status === 404);
      }
      return response.json();
    }
  );
};
