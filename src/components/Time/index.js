import React, { Component } from 'react';
let moment = require('moment');



class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment(),
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({time: moment()})
        }, 1000)

    }
    render() {

        return (
            <div className="w-100 h-85vh flex items-end justify-end">
                <time className={"f2 fw2 pa3"}>{this.state.time.format('h:mm a')}</time>
            </div>
        );
    }
}

export default Time;
