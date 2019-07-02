import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import FocusLayout from '../FocusLayout'
import request from '../../fn/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://servad.local:3010',
      dataRoute: 'http://servad.local:3010/data',
      focus: {
        col: 3,
        row: 3
      },
      data: false,
      hasData: false
    };
    this.moveFocus = this.moveFocus.bind(this);
    this.focusUp = this.focusUp.bind(this);
    this.focusDown = this.focusDown.bind(this);
    this.focusRight = this.focusRight.bind(this);
    this.focusLeft = this.focusLeft.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.fnMap = this.fnMap.bind(this);
    this.gestureMap = this.gestureMap.bind(this);
    this.getData = this.getData.bind(this);
  }
  fnMap() {
    return {
      37: this.focusLeft,
      38: this.focusUp,
      39: this.focusRight,
      40: this.focusDown,
      reset: () => this.setFocus(3, 3)
    };
  }
  gestureMap() {
    return {
      left: this.focusLeft,
      up: this.focusUp,
      right: this.focusRight,
      down: this.focusDown,
      reset: () => this.setFocus(3, 3)
    };
  }
  componentDidMount() {
    this.getData();
    const fnMap = this.fnMap();
    document.addEventListener('keydown', e => {
      if (Object.keys(fnMap).includes(e.keyCode.toString())) {
        fnMap[e.keyCode]();
      } else {
        fnMap.reset();
      }
    });
    const socket = socketIOClient(this.state.endpoint);
    const gestureMap = this.gestureMap();
    socket.on('gesture', gesture => {
      if (gestureMap[gesture]) gestureMap[gesture]();
    });

    setInterval(this.getData, 1800000)
  }
  getData() {
    request(this.state.dataRoute)(e => {
      console.log('isRequesting', e);
      let newState = Object.assign({}, e, { hasData: true });
      this.setState(newState);
    })(e => {
      console.log('err', e);
    });
  }
  moveFocus(dimension, up) {
    let newState = this.state;
    newState.focus[dimension] = up
      ? newState.focus[dimension] + 1
      : newState.focus[dimension] - 1;
    if (newState.focus[dimension] > 3) newState.focus[dimension] = 3;
    if (newState.focus[dimension] < 1) newState.focus[dimension] = 1;
    this.setState(newState);
  }
  focusUp() {
    this.moveFocus('row', true);
  }
  focusDown() {
    this.moveFocus('row', false);
  }
  focusRight() {
    this.moveFocus('col', true);
  }
  focusLeft() {
    this.moveFocus('col', false);
  }
  setFocus(col, row) {
    let newState = this.state;
    newState.focus = {
      col: col,
      row: row
    };
    this.setState(newState);
  }

  render() {
    return (
        this.state.hasData &&
          <FocusLayout data={this.state.data} />
        
    );
  }
}

export default App;
