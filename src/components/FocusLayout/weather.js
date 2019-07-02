import React from 'react'
import { format, isWithinRange } from 'date-fns'
import WeatherIcon from 'react-icons-weather';
const Weather = (props) => {
const currentWeather = props.data ? props.data.currentWeather : false;
const sunset = new Date(currentWeather.sys.sunset * 1000);
const sunrise = new Date(currentWeather.sys.sunrise * 1000);
return currentWeather && (<div className={'weather'}>
                     <WeatherIcon name="owm" className={"weather-icon"} night={isWithinRange(new Date(), sunrise, sunset)} iconId={"" + currentWeather.weather[0].id} />
                    <span className={"weather-temp"}>{currentWeather.main.temp.toFixed(0)}<span className="weather-deg">°</span></span>
                    <span className={"weather-type"}>{currentWeather.weather[0].main}</span> 
                    <div className={"weather-sunset"}><i className={"weather-sunset-icon wi wi-sunset"} /><span className={"weather-sunset-time"}>{format(sunset, 'h:mm a')}</span></div>
                </div>)
                }

export default Weather