import React, { Component, useState, useEffect } from 'react';
import request from '../../fn/api';
import Time from '../Time'
import Weather from '../Weather'
import News from '../News'
const dataRoute = 'http://servad.local:3010/data'

const App = () => {
  const [data, setData] = useState(false)
  const [forceRefreshKey, setForceRefreshKey] = useState(false)
  const [dataInterval, setDataInterval] = useState(1800000)

  useEffect(() => {
    getData();
    setInterval(getData, 1800000)
  }, [])

  function getData() {
    request(dataRoute)(e => {
      const newData = e.data
      const newForceRefreshKey = e.forceRefreshKey
      const newDataInterval = e.dataInterval
      if (newDataInterval !== dataInterval) {
        setDataInterval(newDataInterval);
      }
      if (newForceRefreshKey !== forceRefreshKey) {
        setForceRefreshKey(newForceRefreshKey);
      }
      if (newData !== data) {
        console.log(data)
        setData(newData);
      }

      shouldRefresh(e.forceRefreshKey) && window.location.reload(true)
    })(e => {
      console.log('err', e);
    });
  }
  function shouldRefresh(newRefresh) {
    if (forceRefreshKey === false) {
      return false;
    }
    return newRefresh !== forceRefreshKey
  }


    return (
        data ?
          <Mirror data={data} />
          : <span>loading...</span>
        
    );
}

const Mirror = ({data: {news, currentWeather, forecast}}) =>
  <div className='focus'>
    <Weather currentWeather={currentWeather} forecast={forecast} />
    <News news={news} />
    <Time />
  </div>

export default App;
