import React, { Component } from 'react';
let moment = require('moment');



class Date extends Component {
    constructor(props) {
        super(props)
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
                {this.state.date.format('dddd, MMMM Do')}
            </div>
        );
    }
}

export default Date;
