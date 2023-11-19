import React, { useEffect, useState } from 'react';
import worldService from '../services/axio';

const Show = ({ countrie }) => {
  const [weather1, setWeather1] = useState();
const [showDetails, setShowDetails] = useState(false);
const [image, setImage] = useState('');

//Get weather data and image by city when showDetails is true
useEffect(() => {
  if(showDetails) {
worldService.weather(countrie.capital)
.then((weath) => {
  setWeather1(weath);
  return worldService.image(weath.weather[0].icon)})
  .then((imageUrl) => {
    setImage(imageUrl);
  })}
}, [showDetails])

//Control show/hide button
  const reveal = () => {
      setShowDetails(!showDetails);
  };


  //Render data from one country
  return (
    <>
      <button onClick={reveal}>Show</button>
      {weather1 && weather1.main && showDetails &&(
        <div key={countrie.name.common}>
          <h1>{countrie.name.common}</h1>
          <p>Capital = {countrie.capital}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(countrie.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={countrie.flags.png} alt={countrie.flags.alt} width="100" height="100" />
          <p>Temperature: {(weather1.main.temp - 273.15).toFixed(2)} Celcius</p>
          <img src={image} alt="image of weather in capital" width="100" height="100" />
          <p>Wind: {weather1.wind.speed} ms</p>
        </div>
      )}
    </>
  );
};

export default Show;

