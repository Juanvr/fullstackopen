import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({city}) =>
{
    const [weather, setWeather] = useState({});
    useEffect(() =>{
        const api_key = process.env.REACT_APP_API_KEY;
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
        console.log(url);
        axios.get(url)
          .then((response) =>
          {
            console.log(response);
            setWeather(response.data);
            return response;
          })
          .catch((response) => console.log(response))
      },[city]);

      let result = <div></div>;
      if(weather.current){
          console.log('weather',weather);
          result =        
            <div>
                <h2>Weather in {city}</h2>
                
                <div>Temperatura: {weather.current.temperature} Celsius</div>
                <img alt={"Tiempo en " + city} src={weather.current.weather_icons[0]} height="80" width="80"></img>
                <div>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
            </div>;
      }
    return result;
}


const Country = ({country, searchByText}) =>
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
        <img alt={"Bandera de " + country.name}src={country.flag} height="80" width="120"></img>
      </div>
      <br/>
      <Weather city={country.capital}/>

    </div>
  );
}

export default Country;