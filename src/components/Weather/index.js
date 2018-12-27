import React, { Component } from 'react';
import request from "../../fn/api.js";
import WeatherIcon from 'react-icons-weather';
import './style.css';
const moment = require('moment');



const convertKtoF = k => {
    return +(( ( k - 273.15 ) * 1.8) + 32)
};

const WeatherInfo = ({ data, className, bothFocus, i, totalEntries}) => {
    const w = data.weather[0];
    const time = moment.unix(data.dt);
    const dayOfWeek = time.format('dddd');
    const night = data.sys.pod === 'n';
    const dayBegin = ( moment.unix(data.dt).subtract(3, 'hours').format('dddd') !== dayOfWeek );
    const dayEnd = ( moment.unix(data.dt).add(3, 'hours').format('dddd') !== dayOfWeek );
    const dayEdge = dayBegin || dayEnd;
    return (
        <div className={"mv2 mw4 flg1 fls3 flex flex-column items-center flex-auto " + className}>
            { bothFocus && <span className={"bg-mid-gray black tc f6 db pv1 h1 ttu " + (dayBegin ? ' ml4 br4 br--top br--left ' : '') + (dayEnd ? ' mr4 br4 br--top br--right ' : '') + (dayEdge ? ' w-70' : ' w-100 ')}>{ (10 < time.format('kk') && time.format('kk') < 13) || ( i === 0 && time.format('kk') > 13 )  || ( i + 1 === totalEntries && time.format('kk') < 10 ) ? dayOfWeek : '' }</span>}
            <span className={" f6 db mv1 mw-100 white-40 " + (bothFocus ? 'ph3' : '' )}> {time.format('h a')}</span>
            <WeatherIcon name="owm" className={"f2 ph3 db tc mv2 mw-100 " + (bothFocus ? 'ph3' : '' )} night={night} iconId={"" + (w.id)} />
            <span className={" f5 db fw8 mv1 mw-100 " + (bothFocus ? 'ph3' : '' )}>{data.main.temp.toFixed(0)}°</span>
            { bothFocus && <span className={" f5 fw1 db mv1 mw-100 " + (bothFocus ? 'ph3' : '' )}>{w.main}</span> }
        </div>
    );
};



class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render() {
        const currentWeather = this.props.data ? this.props.data.currentWeather : false;
        const forecast = this.props.data ? this.props.data.forecast : false;
        const bothFocus = this.props.rowFocus && this.props.colFocus;
        const viewableEntries = bothFocus ? 38 : 7;
        const displayedEntries = forecast ? forecast.list.slice(0, viewableEntries) : [];
        const sunset = moment.unix(currentWeather.sys.sunset);
        const sunrise = moment.unix(currentWeather.sys.sunrise);
        const now = moment();
        return (
            <div className={"flex flex-wrap mh-90v pb5" + (bothFocus ? 'flex-row' : 'flex-column' ) }>
                <div className={'current-weather-grid fls1 br b--mid-gray tc ' +  (bothFocus ? ' flg10 flb5 current-weather-grid--both-focus mw6 ph3 pb3 bw1' : ' flg3 mv2 mw4 bw0 ')}>
                    { bothFocus && <span className={"w-100 bg-mid-gray mt2 br4 br--top black tc f6 db pv1 h1 ttu span-col-2 "}>Now</span>}
                    {currentWeather && <WeatherIcon name="owm" className={"ease-all db tc self-center center " + (bothFocus ? 'f-6 span-row-4 mw-100' : 'f1 mw-100')} night={!now.isBetween(sunrise, sunset)} iconId={"" + currentWeather.weather[0].id} />}
                    {bothFocus && <span className={" f4 white-40 db mt2 mb1 " + (bothFocus ? 'col-2 mw-100' : 'col-1 mw-100')}>{currentWeather && currentWeather.name}</span>}
                    <span className={" f3 fw8  db " + (bothFocus ? 'col-2 mv1 mw-100' : 'col-1 mv2 w-100')}>{currentWeather && currentWeather.main.temp.toFixed(0)}°</span>
                    { bothFocus && <span className={" f3 mv1 db fw1 " + (bothFocus ? 'col-2 mw-100' : 'col-1 w-100')}>{currentWeather && currentWeather.weather[0].main}</span> }
                    {currentWeather && bothFocus && <div className={" grid grid-1-col mt1 grid-2-row white-40 db g-items-center mw-100 " + (bothFocus ? 'col-2' : 'col-1')}><i className={"f3 wi wi-sunset"} /><span className={"f6 mt2"}>{sunset.format('h:mm a')}</span></div>}
                </div>
                {displayedEntries.map((f, i) => {
                   return <WeatherInfo data={f} key={i} i={i} totalEntries={ displayedEntries.length } bothFocus={bothFocus} className={' ' + (bothFocus ? '' : '' )} />
                })}
            </div>
        );
    }
}

export default Weather;
