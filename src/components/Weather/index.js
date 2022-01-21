import React from 'react'
import { format, isWithinRange } from 'date-fns'
import WeatherIcon from 'react-icons-weather';
import Forecast from './forecast';
const Weather = ({currentWeather, forecast}) => {
    if (!currentWeather) {
        return <div>Error: Weather Not Found</div>
    }
    const sunset = new Date(currentWeather.sys.sunset * 1000);
    const sunrise = new Date(currentWeather.sys.sunrise * 1000);
    const mightRain = forecast.list.slice(0,4).some(item => item.hasOwnProperty('rain')) || currentWeather.hasOwnProperty('rain');
    return (
        <div className={'weather'}>
            <WeatherIcon name="owm" className={"weather-icon"} night={!isWithinRange(new Date(), sunrise, sunset)} iconId={"" + currentWeather.weather[0].id} />
            <p className={"weather-temp"}>
                {currentWeather.main.temp.toFixed(0)}
                <span className="weather-deg">°</span>
            </p>
            <p className={"weather-type"}>
                <span>
                    {currentWeather.weather[0].main}
                </span>
                <i className={`weather-rain-icon ${mightRain ? 'weather-rain-icon--active' : '' } wi wi-umbrella`} />
            </p>
            <div className={"weather-sunset"}><span className={"weather-sunset-label"}>Sunset at:</span>
                <i className={"weather-sunset-icon wi wi-sunset"} />
                <span className={"weather-sunset-time"}>
                    {format(sunset, 'h:mm a')}
                </span>
            </div>
            <Forecast list={forecast.list} sunrise={sunrise} sunset={sunset} />
        </div>
    );
}

export default Weather