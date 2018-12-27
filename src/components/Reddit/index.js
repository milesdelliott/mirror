import React, { Component } from 'react';
import './style.css';
const moment = require('moment');


const RedditItem = ({data, colFocus, rowFocus, className, storyIndex}) => {
        const isSecondary = !(storyIndex === 0);
        const bothFocus = colFocus && rowFocus;
        return (<article className={"RedditItem flex items-center justify-center fls1 flg1 ease-all flex-row " + (bothFocus ? 'b--white' : '') + ' ' + className }>
                {data.url && <img className={"ease-all  pb4 center mw-100 h-auto" + (bothFocus ? '' : 'nr7 o-0') + (storyIndex === 0 ? ' fl' : ' fl')} src={data.url} />}
            </article>
        );
    };

class Reddit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reddit: false,
            currentIndex: 0,
        };
        this.nextIndex = this.nextIndex.bind(this);
    }
    componentDidMount() {
        setInterval(() => {
           this.nextIndex()
        }, 2000)

    }

    nextIndex() {
        const currentIndex = this.state.currentIndex + 1;
        if ( this.props.data.reddit && (currentIndex >= this.props.data.reddit.length)) {
            this.setState({currentIndex: 0})
        } else {
            this.setState({currentIndex: currentIndex})
        }
    }

    getIndexMap(index = 0, length = 0) {
        const dif = length - index;
        switch (dif) {
            case 0:
                // this case should be caught by the this.nextIndex() before it gets to this function
                return {
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                };
            case 1:
                return {
                    0: index,
                    1: 0,
                    2: 1,
                    3: 3,
                };
            case 2:
                return {
                    0: index,
                    1: index + 1,
                    2: 0,
                    3: 1
                };
            case 3:
                return {
                    0: index,
                    1: index + 1,
                    2: index + 2,
                    3: 0
                };
            default:
                return {
                    0: index,
                    1: index + 1,
                    2: index + 2,
                    3: index + 3,
                };
        }
    }
    render() {
        const reddit = this.props.data.reddit;
        const bothFocus = this.props.rowFocus && this.props.colFocus;
        const indexMap = reddit ? this.getIndexMap(this.state.currentIndex, reddit) : {0: this.state.currentIndex, 1: this.state.currentIndex + 1, 2: this.state.currentIndex + 2};
        return bothFocus && (
            <div className="flex flex-row mh5 mv2 relative ">
                <div className={" flex flex-column flex-wrap"}>
                {reddit && [0,1,2,3].map(e => reddit[indexMap[e]] && <RedditItem className={""} key={e} storyIndex={e} data={reddit[indexMap[e]].data} colFocus={this.props.colFocus} rowFocus={this.props.rowFocus} />)}
                </div>
            </div>
        ) || <img className={"h-auto w-100 absolute top-0 left-0 center"} src={reddit[indexMap[0]].data.url} /> ;
    }
}

export default Reddit;
