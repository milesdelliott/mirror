import React, { Component } from 'react';
import request from "../../fn/api.js";
import './style.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faNewspaper from '@fortawesome/fontawesome-pro-solid/faNewspaper';
const moment = require('moment');


const NewsItem = ({story, colFocus, rowFocus, className, storyIndex}) => {
        const isSecondary = !(storyIndex === 0);
        console.log(isSecondary, storyIndex)
        const bothFocus = colFocus && rowFocus;
        const classMap = {
            0: 'flb-100 bb b--white bw1 pb3 mb3 ' ,
            1: 'flb-25 br b--white bw1 pr3 mr3 ',
            2: 'flb-25 ',
            secondary: `flb-25 ${bothFocus ? '' : 'o-0'} `
    }

        //console.log(story)
        return (<article className={"NewsItem fls1 flg1 ease-all flex-row " + (classMap[storyIndex]) + (isSecondary ? classMap['secondary'] : '') + ' ' + className }>
                {story.multimedia[story.multimedia.length - 2] && <img className={"ease-all pr3 pb3 " + (bothFocus ? '' : 'nr7 o-0') + (storyIndex == 0 ? ' fl' : ' fl')} src={story.multimedia[story.multimedia.length - 2].url} />}
                <h4 className={'NewsItem__title ma0 ' + (bothFocus && storyIndex == 0 ? 'f2' : 'f3') + (storyIndex == 0 ? ' fw8' : ' fw4')}>{story && story.title}</h4>
                {bothFocus && <p className={"white-60 ph0 mv2 fw1"}>{story.abstract}  </p>}
            </article>
        );
    }

class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newsRoute: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=667aeb1938ed490f875d5fa9cfb1d1e6',
            news: false,
            currentIndex: 0,
        }
        this.nextIndex = this.nextIndex.bind(this);
    }
    componentDidMount() {
        request(this.state.newsRoute)(e => {
            console.log(e)
            this.setState({news: e})
        })(e => e)
        setInterval(() => {
           this.nextIndex()
        }, 8000)

    }

    nextIndex() {
        const currentIndex = this.state.currentIndex + 1;
        if ( this.state.news && (currentIndex >= this.state.news.results.length)) {
            this.setState({currentIndex: 0})
        } else {
            this.setState({currentIndex: currentIndex})
        }
    }


    render() {
        const bothFocus = this.props.rowFocus && this.props.colFocus;
        const preLast = this.state.news && (this.state.currentIndex === this.state.news.results.length);
        const last = this.state.news && (this.state.currentIndex >= this.state.news.results.length);
        const indexMap = {
            0: this.state.currentIndex,
            1: last ? 0 :  this.state.currentIndex + 1,
            2: preLast ? 0 : this.state.currentIndex + 2,
        }
        if (this.state.news) console.log('indicies',this.state.currentIndex, this.state.news.results[indexMap[1]], this.state.news.results[indexMap[2]])
        return (
            <div className="flex flex-row">
                <FontAwesomeIcon className="mr2 f3 orange" icon={faNewspaper} />
                <div className={" flex flex-row flex-wrap"}>
                {this.state.news && [0,1,2].map(e => <NewsItem className={"flb-100"} key={e} storyIndex={e} story={this.state.news.results[indexMap[e]]} colFocus={this.props.colFocus} rowFocus={this.props.rowFocus} />)}
                </div>
            </div>
        );
    }
}

export default News;
