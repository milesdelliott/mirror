import React, { Component } from 'react';
import request from '../../fn/api';
import Time from '../Time'
import Weather from '../Weather'
import News from '../News'
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://servad.local:3010',
      dataRoute: 'http://servad.local:3010/data',
      data: false,
      hasData: false,
      forceRefreshKey: false,
      dataInterval: 1800000,
    };

    this.getData = this.getData.bind(this);
    this.shouldRefresh = this.shouldRefresh.bind(this);
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData, this.state.dataInterval)
  }
  getData() {
    request(this.state.dataRoute)(e => {
      console.log('isRequesting', e);
      let newState = Object.assign({}, e, { hasData: true });
      this.shouldRefresh(e.forceRefreshKey) && window.location.reload(true)
      this.setState(newState);
    })(e => {
      console.log('err', e);
    });
  }
  shouldRefresh(newRefresh) {
    if (this.state.forceRefreshKey === false) {
      return false;
    }
    return newRefresh !== this.state.forceRefreshKey
  }

  render() {
    return (
        this.state.hasData &&
          <Mirror data={this.state.data} />
        
    );
  }
}

const Mirror = ({data: {news, currentWeather, forecast}}) =>
  <div className='focus'>
    <Weather currentWeather={currentWeather} forecast={forecast} />
    <News news={news} />
    <Time />
  </div>

export default App;
