import React, {Component} from 'react'
import { format } from 'date-fns'


const times = [
    {
        text: 'o\'Clock',
        min: 0,
        max: 2,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Just past',
        min: 3,
        max: 7,
        offset: 0,
        appendHour: true,
    },
    {
        text: 'Ten',
        min: 8,
        max: 12,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Fifteen',
        min: 13,
        max: 18,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Twenty',
        min: 19,
        max: 25,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Thirty',
        min: 25,
        max: 35,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Forty',
        min: 36,
        max: 42,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Forty-five',
        min: 43,
        max: 48,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Fifty',
        min: 49,
        max: 55,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Almost',
        min: 56,
        max: 60,
        offset: 1,
        appendHour: true,
    }
]

const numbers = ['twelve','one', 'two', 'three', 'four', 'five', 'six','seven','eight','nine','ten','eleven','twelve'];
const factorOffset = (time, hour) => {
    const calc = time.offset + parseInt(hour)
    return calc > 12 ? calc-12 : calc;
}
const getDescriptor = (date) => {
    const hour = format(date, 'H');
    const minute = format(date, 'm');
    return times.reduce((response, time) => {
        if (minute >= time.min && minute <= time.max ) {
            return {
                appendHour: time.appendHour,
                text: time.text,
                hour: numbers[factorOffset(time, hour)]
            };
        }
        return response;
    }, format(date, 'h:mm a'))
}

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({time: new Date()})
        }, 1000)

    }
    render() {
                const nice = getDescriptor(this.state.time)
        return (
            <div className='time'>
            <p className="time-date">{format(this.state.time, 'dddd')}
            <br />
            {format(this.state.time, 'D MMMM YYYY')}
            </p>
            <time className="digital">{format(this.state.time, 'h:mm')} <span>{Number(format(this.state.time, 'H')) > 12 ? '.' : ''}</span> </time>
            <time className="nice">
            
            {nice.appendHour ?
                
                [<span key="text" className="nice-text">{nice.text} </span>,
                <span key="hour" className="nice-hour">{nice.hour}</span>]
                :
                [<span key="hour" className="nice-hour">{nice.hour} </span>,
                <span key="text" className="nice-text">{nice.text}</span>]
            
            }
            
            </time>
            
            </div>
        );
    }
}

export default Time;
