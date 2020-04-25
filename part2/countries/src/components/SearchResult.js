import React from 'react';
import Countries from './Countries';
import Country from './Country';

const SearchResult = ({countries, maxCountriesShownResult, searchByText}) =>
{
  const countriesNumber = countries.length;

  const tooManyCountries = countriesNumber > maxCountriesShownResult;
  const someCountries = countriesNumber > 1 && !tooManyCountries;
  const oneCountry = countriesNumber === 1;

  let result = "";
  if (tooManyCountries){
    result = <div>Too many matches, specify another filter</div>;
  }
  else
  if (someCountries){
    result = <Countries countries={countries} searchByText={searchByText}/>
  } 
  else 
  if (oneCountry)
  {
    result = <Country country={countries[0]}/>
  }else{
    result = <div>There were no matches for the search</div>;
  }

  return(
      <div>
        {result}
      </div>
    );
};

export default SearchResult;