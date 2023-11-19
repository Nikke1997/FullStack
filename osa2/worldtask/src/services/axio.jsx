import axios from 'axios';

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const api_key = import.meta.env.VITE_SOME_KEY

//Get all countries
const get = () => {
const request = axios.get(baseUrl)
return request.then(response => response.data)
}

//get weather data by city
const weather = (city) => {
const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
return request.then(response => response.data)
}

//get weather icon by key
const image = (key) => {
    const request = axios.get(`https://openweathermap.org/img/wn/${key}@2x.png`)
    return request.then(response => response.config.url)
}

export default {get, weather, image};