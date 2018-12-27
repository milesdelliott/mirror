import React, { Component } from 'react';
import Calendar from '../Calendar'
let moment = require('moment');



class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({date: moment()})
        }, 10000)

    }
    render() {

        return (
            <div className="">
                <h4 className={"f2 fw3 right-0 tl w-100 ma0 ph4"}>{this.state.date.format('dddd, MMMM Do')}</h4>
                <Calendar events={this.props.data.calendar} />
            </div>
        );
    }
}

export default Date;
