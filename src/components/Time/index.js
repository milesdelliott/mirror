import React, {Component, useState, useEffect} from 'react'
import { format } from 'date-fns'

const pipe = (...functions) =>
    args =>
        functions.reduce((arg, fn) => 
            fn(arg),
        args);

const times = [
    {
        text: 'o\'Clock',
		max: 2,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Just past',
		max: 7,
        offset: 0,
        appendHour: true,
    },
    {
        text: 'Ten',
		max: 12,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Fifteen',
		max: 18,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Twenty',
		max: 25,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Thirty',
		max: 35,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Forty',
		max: 42,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Forty-five',
		max: 48,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Fifty',
		max: 55,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Almost',
		max: 60,
        offset: 1,
        appendHour: true,
    }
]

const add = (a) => (b) => a + b
const convert24to12 = (number) => number > 12 ? number - 12 : number;
const getDisplayHour = (intHour) => ['twelve','one', 'two', 'three', 'four', 'five', 'six','seven','eight','nine','ten','eleven','twelve'][intHour]
const getDescriptor = (date) => {
    const minute = parseInt(format(date, 'm'));
    return times.reduce((response, time) => {
        if (minute > time.max || response.hasOwnProperty('hour')) {
            return response
        }
        const displayHour = pipe( parseInt,
                                    add(time.offset),
                                    convert24to12,
                                    getDisplayHour
                                )(format(date, 'H'));
        return {
            appendHour: time.appendHour,
            text: time.text,
            hour: displayHour
        };
    }, format(date, 'h:mm a'))
}
const Time = () => {
        const [time, setTime] = useState(new Date());
        useEffect(() => {
            setInterval(() => {
                setTime(new Date());
            }, 1000)
            
        });
        const nice = getDescriptor(time);
        return (
            <div className='time'>
            <time dateTime={format(time, 'H:mm')} className="digital">{format(time, 'h:mm')} <span>{Number(format(time, 'H')) > 12 ? '.' : ''}</span> </time>
            <h1><time dateTime={format(time, 'H:mm')} className="nice">
            
            {nice.appendHour ?
                
                [<span key="text" className="nice-text">{nice.text} </span>,
                <span key="hour" className="nice-hour">{nice.hour}</span>]
                :
                [<span key="hour" className="nice-hour">{nice.hour} </span>,
                <span key="text" className="nice-text">{nice.text}</span>]
            
            }
            
            </time></h1>
            <time dateTime={format(time, 'H:mm')} className="time-date">
            <span className="time-dow">{format(time, 'dddd')}</span>
            <span className="time-day">{format(time, 'D MMMM YYYY')}</span>
            </time>
            </div>
        );
    }

export default Time;
