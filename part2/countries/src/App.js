import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchMatchCountries, setSearchMatchCountries] = useState([]);

  useEffect(() =>{
    axios.get("https://restcountries.eu/rest/v2/all")
      .then((response) =>
      {
        setCountries(response.data);
        return response;
      })
      .catch((response) => console.log(response))
  },[]);

  const filterCountries = (countries, searchText) => countries.filter(a => a.name.toLowerCase().indexOf(searchText.toLowerCase())>-1);

  const searchByText = (text) => {
    const filteredCountries = filterCountries(countries, text);
    setSearchMatchCountries(filteredCountries);
  }
  
  const search = ({target}) =>{
    const searchText = target.value;
    searchByText(searchText);
  }

  return (
    <div>
      <SearchBox onChange={search}/>
      <SearchResult countries={searchMatchCountries} maxCountriesShownResult={10} searchByText={searchByText}/>
    </div>
  );
}

export default App;
