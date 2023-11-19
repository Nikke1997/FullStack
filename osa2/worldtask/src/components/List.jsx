import React, { useEffect, useState } from "react";
import Show from "./Show";
import worldService from '../services/axio'

const List = ({ filteredWorlds, countries}) => {
  const [weather1, setWeather1] = useState()
  const [city, setCity] = useState('')  
  const [image, setImage] = useState("")


  //Set city to state if filteredWorlds has only one country
  useEffect(() => {
    if (filteredWorlds.length === 1) {
      setCity(filteredWorlds[0].capital);
  }}, [filteredWorlds]);


  //Get weather data and image by city only when city is set to state
  useEffect(() => {
    if (city) {
      worldService.weather(city[0])
      .then((weath) => {
        setWeather1(weath);
        return worldService.image(weath.weather[0].icon)})
        .then((imageUrl) => {
         setImage(imageUrl)
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }, [city]);


  //Dont show anything if over 10 countries is filtered
  if (filteredWorlds.length > 10 && filteredWorlds.length < countries.length) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
    //Show data from one country if only one country is filtered
  } else if (filteredWorlds.length === 1) {
    return (
      <div>
        {filteredWorlds.map((countrie) => {
          return (
            <div key={countrie.name.common}>
              <h1>{countrie.name.common}</h1>
              <p>Capital = {countrie.capital}</p>
              <h3>Languages:</h3>
              <ul>
                {Object.values(countrie.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <img
                src={countrie.flags.png}
                alt="flag"
                width="100"
                height="100"
              />
            </div>
          );
        })}
        {weather1 && (
          <div>
            <p>Temperature: {(weather1.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img src={image} alt="weather" width="100" height="100" />
            <p>Wind: {weather1.wind.speed} ms</p>
          </div>
        )}
      </div>
    );
  }
  //Base case, show all filtered countries
  return (
    <div>
      {filteredWorlds.map((countrie) => {
        return (
          <li key={countrie.name.common}>
            {countrie.name.common} <Show countrie={countrie}/>
          </li>
       
        );
      })}
      </div>
  )
    }

export default List;
