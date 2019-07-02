import React from 'react'
import { format } from 'date-fns'
import Time from './time'
import Weather from './weather'
import News from '../News'
import './style.css';



const FocusLayout = (props) => {
    console.log('focuslayout', props)
   
    return (
        <div className='focus'>
            <Weather data={props.data} />
            <News data={props.data} />
            <Time />
        </div>
    );
}

export default FocusLayout