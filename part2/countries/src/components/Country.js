import React from 'react';

const Country = ({country}) =>
{
  return (
    <div>
      <h1>{country.name}</h1>
      <br/>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <br/>
      <h2>Languages</h2>
      {country.languages.map(
        (language) => <li key={language.iso639_1}>{language.name}</li>
      )}
      <div>
        <img src={country.flag} height="80" width="120"></img>
      </div>

    </div>
  );
}

export default Country;