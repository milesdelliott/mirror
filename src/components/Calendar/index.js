import React, { Component } from 'react';
let moment = require('moment');

const Event = ({data}) => {
    return <div className={"flex flex-row flex-wrap justify-between mv2"}>
        <span className={'fw2'}>{data.summary}</span>
        <span className={"ph3 white-40 fw1"}>
            <span>{moment(data.start.dateTime).format('H:mm a')}</span>
            <span> – </span>
            <span>{moment(data.end.dateTime).format('H:mm a')}</span>
        </span>
    </div>
}

const compareDate = (a, b) => {
    const alpha = moment(a.start.dateTime)
    const beta = b.start.dateTime
    if (alpha.isBefore(beta)) {
        return -1;
    }
    if (alpha.isSame(beta)) {
        return 0;
    }
    if (alpha.isAfter(beta)) {
        return 1;
    }
}

const EventList = ({events}) => {
    const dayGroups = events.reduce((a,v,i,s) => {
        const date = moment(v.start.dateTime).format('MMM Do, YYYY')
        if (!a[date]) {
            a[date] = [v]
        } else {
            a[date] = [v, ...a[date]]
        }
        return a
    }, {});

    const groupKeys = Object.keys(dayGroups)

    return <div>
        {groupKeys.length > 0 && groupKeys.map((e, i) =>
            <div className={'mb4'} key={i}>
                <h3 className={"bg-white black pa1 mw6"}>{e}</h3>
                <ul className={"mw6"}>
                    {  dayGroups[e].sort(compareDate).map((v, j) => <Event key={j} data={v} />) }
                </ul>
            </div>
        )}
    </div>
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const events = this.props.events
        return (
            <div className="pa3">
               { events.length > 0 &&
                <EventList events={events} />
               }
            </div>
        );
    }
}

export default Calendar;
