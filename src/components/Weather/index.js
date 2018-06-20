import React, { Component } from 'react';
import request from "../../fn/api.js";
import WeatherIcon from 'react-icons-weather';
const moment = require('moment');



const convertKtoF = k => {
    return +(( ( k - 273.15 ) * 1.8) + 32)
}

const WeatherInfo = ({ data }) => {
    const w = data.weather[0];
    return (
        <div className="mv2 mw4 flex flex-column items-center flex-auto">
            <span className={" f6 db mv1 mw-100 white-40"}> {moment.unix(data.dt).format('h:mm a')}</span>
            <WeatherIcon name="owm" className={"f2 db tc mv2 mw-100"} iconId={"" + (w.id)} />
            <span className={" f5 db mv1 mw-100"}>{w.main}</span>
            <span className={" f5 db mv1 mw-100"}>{convertKtoF(data.main.temp).toFixed(1)}</span>
        </div>
    );
}



class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherRoute: 'http://api.openweathermap.org/data/2.5/weather?id=4487042&appid=ee03120047e0d4e43106ad4ff81da02a',
            forecastRoute: 'http://api.openweathermap.org/data/2.5/forecast?id=4487042&appid=ee03120047e0d4e43106ad4ff81da02a',
            currentWeather: false,
            forecast: false
        }
    }
    componentDidMount() {
        request(this.state.weatherRoute)(e => {
            console.log(e)
            this.setState({currentWeather: e})
        })(e => e)
        request(this.state.forecastRoute)(e => {
            console.log(e)
            this.setState({forecast: e})
        })(e => e)

    }

    render() {
        const bothFocus = this.props.rowFocus && this.props.colFocus;
        const viewableEntries = bothFocus ? 23 : 4
        return (
            <div className="flex flex-wrap flex-column mh-100">
                <div className={'mv2 mw4 flex flg1 fls1 flex-column flex-wrap items-center' +  (bothFocus ? ' flb-100' : '')}>
                    {this.state.currentWeather && <WeatherIcon name="owm" className={"f1 db tc mw-100"} iconId={this.state.currentWeather.weather[0].id} />}
                    <span className={" f3 db mw-100"}>{this.state.currentWeather && convertKtoF(this.state.currentWeather.main.temp).toFixed(1)}</span>
                    <span className={" f3 db mw-100"}>{this.state.currentWeather && this.state.currentWeather.weather[0].main}</span>
                </div>
                {this.state.forecast && this.state.forecast.list.slice(0, viewableEntries).map((f, i) => {
                   return <WeatherInfo data={f} key={i} />
                })}
            </div>
        );
    }
}

export default Weather;
