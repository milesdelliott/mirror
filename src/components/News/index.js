import React, { Component } from 'react';
import NewsIcon from './news-icon'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faNewspaper from '@fortawesome/fontawesome-pro-solid/faNewspaper';

const NewsItem = ({ story, className, storyIndex }) => {
  const isPrimary = storyIndex === 0;
  return (
    <article
      className={
        `NewsItem fls1 flg1 ease-all flex-row
        b--mid-gray ${className}`
      }
    >
      {story.multimedia[story.multimedia.length - 2] && isPrimary && (
        <img
          className={
            `ease-all pr3 pb3 fl ${isPrimary ? ' db' : ' dn'}`
          }
          src={story.multimedia[story.multimedia.length - 2].url}
        />
      )}
      <h4
        className={
          `NewsItem__title ma0
          ${isPrimary ? ' f2 fw4' : ' fw8 f3'}`
        }
      >
        {story && story.title}
      </h4>
      {isPrimary && <p className={'white-80 ph0 mv2 fw1'}>{story.abstract} </p>}
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
    this.setState({ currentIndex: this.state.currentIndex > 100 ? 0 : this.state.currentIndex + 1 });
      
  }

  getOffsetIndex(length, index) {
    return offset => (index + offset) % length
  }
  render() {
    const {news} = this.props;
    if (!!news.fault)
      return (
        <div className="flex flex-row mh5 mv2 relative ">
          Error with News Feeds
        </div>
      );
    const getIndexWithOffset = this.getOffsetIndex(news.results.length, this.state.currentIndex);
    return (
      <div className="news relative ">
        <h2
          className={ 'news-title' }
        ><NewsIcon /> News</h2>
        
        <div className={' flex flex-row flex-wrap'}>
        {[0,1,2].map(i => <NewsItem
                    className={'flb-100'}
                    key={i}
                    storyIndex={i}
                    story={news.results[getIndexWithOffset(i)]}
                  />)}
        </div>
      </div>
    );
  }
}

export default News;
