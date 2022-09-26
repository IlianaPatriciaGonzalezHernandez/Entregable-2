import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

//Este estado fue creado para guardar la informacion de la latitud y longitud
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState() 
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    //Esta es la funcion que se ejecuta cuando llega la informacion de nuestra ubicacion
    const success = position => {
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      setCoords(obj);
    }
  //Esto hace el llamado a la API del navegador, para usar la ibicacion actual, una vez que llega la informacion de la ubicación, se ejecuta la funcion "success"
    navigator.geolocation.getCurrentPosition(success)
  }, [])
   console.log(coords)

   //--------------------Peticion del clima--------------------------

   useEffect (() => {
    if(coords) {
    const APIKEY = 'c780dacd097ca9d40a57f836d707b992'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
    axios.get(URL)
    //Si la informacion de la funcion llega correctamente se ejecuta .then
    .then(res => {
      const celsius =(res.data.main.temp - 273.15).toFixed(0)
      const farenheit = (celsius * 9 / 5 + 32).toFixed(0)
      setTemperature({celsius, farenheit})
      setWeather(res.data)
    })

    .catch(err => console.log(err))
   }
  }, [coords])

  return (
    <div className="App">
      {
        weather ?
      <WeatherCard weather={weather} temperature={temperature} />
      :
      <Loading />
      }

      
    </div>
  )
}

export default App
