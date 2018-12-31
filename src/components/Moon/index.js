import React, { Component } from 'react';
import './style.css';
let moment = require('moment');


const MoonPhase = ({phase}) => {
    const classMap = {
        'First Quarter': 'first-quarter',
        'Full Moon': 'full-moon',
        'Second Quarter': 'second-quarter',
        'New Moon': 'new-moon',
    };
    const classArr = [
        'new-moon',
        'new-moon',
        'second-quarter',
        'second-quarter',
        'full-moon',
        'full-moon',
        'first-quarter',
        'first-quarter',
    ];
    const phaseClass = classArr[Math.ceil(phase.float)];
    const width = phase.int < 2 || (phase.int > 4 && phase.int < 6) ? Math.floor( (50 * (1 - ((phase.float % 2)/2))) * 2) : Math.floor( 100 * ((phase.float % 2)/2));
    return <div className={`moon-outer ${phaseClass} `}>
        <div style={{width: width + '%'}} className={`moon-inner ${phaseClass} `} />
        <div className={`moon-after ${phaseClass}`} />
    </div>
};

const getPhaseName = (day) => {
        return ['new-moon',
        'waxing-crescent-moon',
        'quarter-moon',
        'waxing-gibbous-moon',
        'full-moon',
        'waning-gibbous-moon',
        'last-quarter-moon',
        'waning-crescent-moon'][day] || 'new-moon'
}

function moonCalc(year,month,day)
{
    const lunarPhase = 2551443;
    const now = new Date(year,month-1,day,20,35,0);
    const newMoon = new Date(1970, 0, 7, 20, 35, 0);
    const phase = ((now.getTime() - newMoon.getTime())/1000) % lunarPhase;
    const phaseDay = Math.floor(phase /(24*3600)) + 1;
    const phaseFloat = ( phaseDay/29 ) * 8
    const phaseInt = Math.round(phaseFloat)
    const phaseName = getPhaseName(phaseInt);
    return {
        float: phaseFloat,
        day: phaseDay,
        name: phaseName,
        int: phaseInt
    }
}


const getMoonPhase = date => (phaseArr) => {
    try {
        const pastIndex = phaseArr.findIndex((p, i, a) => {
            if (!a[i+1]) {
                return false
            }
            const index = date.isBetween(moment(`${a[i].date} ${a[i].time}`, 'YYYY MMM DD HH:mm'), (moment(`${a[i+1].date} ${a[i+1].time}`, 'YYYY MMM DD HH:mm')));
            return index;

        });
        const boundedIndex = pastIndex !== -1 ? pastIndex : 0;
        const phases = [
            phaseArr[boundedIndex],
            phaseArr[boundedIndex + 1]
        ];
        const times = phases.map(e => moment(`${e.date} ${e.time}`, 'YYYY MMM DD HH:mm'));
        const phaseLength = times[0].diff(times[1], 'hours');
        const hoursUntil = date.diff(times[1], 'hours');
        return {
            completion: 1 - hoursUntil/phaseLength,
            nextName: phases[1].phase,
            nextDate: phases[1].date,
            nextTime: phases[1].time
        }
    } catch (error) {
        console.log(error)
    }


};

class Moon extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const m = moment();
        const phase = moonCalc(m.format('YYYY'),m.format('MM'),m.format('DD'),);
        console.log(phase)
        //const phase = getMoonPhase(m)(this.props.data.moon);
        const bothFocus = this.props.rowFocus && this.props.colFocus;
        return phase
            ? [
            <div key='moonWrapper' className={((this.props.colFocus && !this.props.rowFocus) && 'w-10 ') + (bothFocus ? 'pa4' : "ph2 pt1 pb2")}>
            <div className="w-100 mh-100 relative aspect-ratio--1x1">
                <MoonPhase  phase={phase}/>
            </div></div>,
            (this.props.rowFocus && this.props.colFocus && <h3 key={'title'} className={`absolute w-100 tc ${bothFocus ? 'f1' : ''}`}>{`${phase.nextName} on ${moment(phase.nextDate, 'YYYY MMM DD').format('MMMM Do')}`}</h3>),
            ]
            : null;
    }
}

export default Moon;
