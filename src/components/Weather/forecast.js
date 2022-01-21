import React from 'react'
import { format, isWithinRange } from 'date-fns'
import WeatherIcon from 'react-icons-weather';

const objectToFormat = (obj) => {
    console.log(obj)
    const name = obj.weather[0].main
    const icon = obj.weather[0].id
    const temp = Math.round(obj.main.temp)
    const forecastDate = new Date(obj.dt * 1000)
    const isNight = ! isWithinRange(forecastDate, obj.sunrise, obj.sunset)
    return {name, icon, temp, forecastDate, isNight}
}

const ForecastItem = ( {data: {name, icon, temp, forecastDate, isNight}} ) => {
    return <li className="forecast-item">
    <div>
    <span className="forecast-time"><span className="forecast-time-hour">{format(forecastDate, 'h')}</span><span className="forecast-time-period">{format(forecastDate, 'A')}</span></span>
     <WeatherIcon name="owm" className={"forecast-icon"} night={isNight} iconId={"" + icon} />
    </div>
           
    <div>
        <span className="forecast-temp">{temp}<span className="weather-deg">°</span></span>
        <span>{name}</span>
    </div>
    </li>
}

const Forecast = ( {list, sunrise, sunset} ) => {
    return <ul className={'forecast'}>
        {list.slice(0,4).map( forecastData => <ForecastItem key={forecastData.dt} sunrise={sunrise} sunset={sunset} data={objectToFormat(forecastData)} />)}
    </ul>
}

export default Forecast;