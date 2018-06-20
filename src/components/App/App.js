import React, { Component } from 'react';
import './App.css';
import Region from '../Region';
import Time from '../Time';
import Date from '../Date';
import Weather from '../Weather';
import News from '../News';
import regions from './regions.js';
import { directionMap } from '../../fn/dom.js';

const componentMap = {
    A: false,
    B:false,
    C:News,
    D:false,
    E:false,
    F: Date,
    G:false,
    H:Weather,
    I:Time,
}



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            regions: regions,
            focus: {
                col: 3,
                row: 3
            }
        }
        this.moveFocus = this.moveFocus.bind(this)
        this.focusUp = this.focusUp.bind(this)
        this.focusDown = this.focusDown.bind(this)
        this.focusRight = this.focusRight.bind(this)
        this.focusLeft = this.focusLeft.bind(this)
        this.setFocus = this.setFocus.bind(this)
        this.fnMap = this.fnMap.bind(this)

    }
    fnMap() {
        return {
            37: this.focusLeft,
            38: this.focusUp,
            39: this.focusRight,
            40: this.focusDown,
            reset: () => this.setFocus(3, 3)
        }
    }
    componentDidMount() {
        const fnMap = this.fnMap()
        console.log(Object.keys(fnMap))
        document.addEventListener('keydown', e => {
            if (Object.keys(fnMap).includes(e.keyCode.toString())) {
                fnMap[e.keyCode]()
            } else {
                fnMap.reset()
            }
        })

    }
    moveFocus(dimension, up) {
            let newState = this.state;
            newState.focus[dimension] = up ? newState.focus[dimension] + 1 : newState.focus[dimension] - 1;
           if (newState.focus[dimension] > 3) newState.focus[dimension] = 3;
            if (newState.focus[dimension] < 1) newState.focus[dimension] = 1
            this.setState(newState);
    }
    focusUp() {
        this.moveFocus('row', true)
    }
    focusDown() {
        this.moveFocus('row', false)
    }
    focusRight() {
        this.moveFocus('col', true)
    }
    focusLeft() {
        this.moveFocus('col', false)
    }
    setFocus(col, row) {
        let newState = this.state;
        newState.focus = {
            col: col,
            row: row,
        }
        this.setState(newState)
    }

  render() {

    return (
      <div className="m sans-serif flex flex-wrap flex-row absolute absolute--fill white">
          {this.state.regions.map((r, i) => <Region  key={i} focus={this.state.focus} row={r.row} col={r.col} level={r.level} component={componentMap[r.name]} />)}
      </div>
    );
  }
}

export default App;
