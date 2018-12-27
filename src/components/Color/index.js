import React, { Component } from 'react';
import './style.css';


class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1,
        }
        this.nextIndex = this.nextIndex.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.nextIndex()
        }, 8000)

    }

    nextIndex() {
        const currentIndex = this.state.currentIndex + 1;
        if ( this.props.data.color && (currentIndex >= this.props.data.color.length)) {
            this.setState({currentIndex: 0})
        } else {
            this.setState({currentIndex: currentIndex})
        }
    }

    render() {
        const colors = this.props.data.color || ['fff', '555']
        return (
            <div className="w-100 mh-100 absolute h-100 top-0 left-0">
                <div style={{backgroundColor: `#${colors[this.state.currentIndex].colors[0]}`}} className={'w-50 h-100 absolute'} />
                <div style={{backgroundColor: `#${colors[this.state.currentIndex].colors[1]}`}} className={'w-50 h-100 absolute right-0'} />
            </div>
        );
    }
}

export default Color;
