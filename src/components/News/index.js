import React, { Component } from 'react';
import './style.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faNewspaper from '@fortawesome/fontawesome-pro-solid/faNewspaper';

const NewsItem = ({ story, colFocus, rowFocus, className, storyIndex }) => {
  const isSecondary = !(storyIndex === 0);
  //console.log(isSecondary, storyIndex)
  const bothFocus = true;
  const classMap = {
    0: 'flb-100 bb bw1 pb3 mb3 ',
    1: 'flb-25 br bw1 pr3 mr3 ',
    2: 'flb-25 ',
    secondary: `flb-25 ${bothFocus ? '' : 'o-0'} `
  };

  return (
    <article
      className={
        'NewsItem fls1 flg1 ease-all flex-row ' +
        classMap[storyIndex] +
        (isSecondary ? classMap['secondary'] : '') +
        (bothFocus ? 'b--moon-gray' : '') +
        ' ' +
        className
      }
    >
      {story.multimedia[story.multimedia.length - 2] && storyIndex === 0 && (
        <img
          className={
            'ease-all pr3 pb3 ' +
            (bothFocus ? '' : 'nr7 o-0') +
            (storyIndex === 0 ? ' db fl' : ' dn fl')
          }
          src={story.multimedia[story.multimedia.length - 2].url}
        />
      )}
      <h4
        className={
          'NewsItem__title ma0 ' +
          (bothFocus && storyIndex === 0 ? 'f2' : 'f3') +
          (storyIndex === 0 ? ' fw8' : ' fw4')
        }
      >
        {story && story.title}
      </h4>
      {storyIndex === 0 && <p className={'white-60 ph0 mv2 fw1'}>{story.abstract} </p>}
    </article>
  );
};

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: false,
      currentIndex: 0
    };
    this.nextIndex = this.nextIndex.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      this.nextIndex();
    }, 8000);
  }

  nextIndex() {
    const currentIndex = this.state.currentIndex + 1;
    if (
      this.props.data.news &&
      currentIndex >= this.props.data.news.results.length
    ) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: currentIndex });
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
          2: 2
        };
      case 1:
        return {
          0: index,
          1: 0,
          2: 1
        };
      case 2:
        return {
          0: index,
          1: index + 1,
          2: 0
        };
      default:
        return {
          0: index,
          1: index + 1,
          2: index + 2
        };
    }
  }
  render() {
    const news = this.props.data.news;
    if (!!news.fault)
      return (
        <div className="flex flex-row mh5 mv2 relative ">
          Error with News Feeds
        </div>
      );
    const bothFocus = true;
    const indexMap = news
      ? this.getIndexMap(this.state.currentIndex, news.results.length)
      : {
          0: this.state.currentIndex,
          1: this.state.currentIndex + 1,
          2: this.state.currentIndex + 2
        };
    return (
      <div className="news relative ">
        <FontAwesomeIcon
          className={
            'ma0 f1 overflow-hidden ph2 mw-100 absolute top-0 left-0 translate-nx1 orange ' +
            (bothFocus ? 'o-50' : '')
          }
          icon={faNewspaper}
        />
        <div className={' flex flex-row flex-wrap'}>
          {news &&
            [0, 1, 2].map(
              e =>
                news.results[indexMap[e]] && (
                  <NewsItem
                    className={'flb-100'}
                    key={e}
                    storyIndex={e}
                    story={news.results[indexMap[e]]}
                    colFocus={this.props.colFocus}
                    rowFocus={this.props.rowFocus}
                  />
                )
            )}
        </div>
      </div>
    );
  }
}

export default News;
