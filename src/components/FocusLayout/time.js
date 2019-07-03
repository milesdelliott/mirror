import React from 'react'
import { format } from 'date-fns'


const times = [
    {
        text: 'o\'Clock',
        min: 0,
        max: 8,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Just past',
        min: 8,
        max: 13,
        offset: 0,
        appendHour: true,
    },
    {
        text: 'Fifteen',
        min: 13,
        max: 21,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Thirty',
        min: 21,
        max: 40,
        offset: 0,
        appendHour: false,
    }, 
    {
        text: 'Forty-five',
        min: 40,
        max: 50,
        offset: 0,
        appendHour: false,
    },
    {
        text: 'Almost',
        min: 50,
        max: 56,
        offset: 1,
        appendHour: true,
    },
    {
        text: 'Not Quite',
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

const Time = () => {
    const date = new Date()
    const nice = getDescriptor(date);
return <div className='time'>
<p className="time-date">{format(date, 'dddd')}
<br />
{format(date, 'D MMMM YYYY')}
</p>
<time className="digital">{format(date, 'h:mm')} <span>{Number(format(date, 'H')) > 12 ? '.' : ''}</span> </time>
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
}

export default Time