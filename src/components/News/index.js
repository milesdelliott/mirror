import React, { useState, useEffect } from 'react';
import NewsIcon from './news-icon'

const NewsItem = ({ story, className, storyIndex }) => {
  const isPrimary = storyIndex === 0;
  return (
    <article
      className={
        `news-item ${isPrimary ? ' news-item--isPrimary' : ''} ${className}`
      }
    >
      {story.multimedia[story.multimedia.length - 2] && isPrimary && (
        <img
          className={
            `news-item-image`
          }
          src={story.multimedia[story.multimedia.length - 2].url}
        />
      )}
      <h4
        className={
          `news-item-title`
        }
      >
        {story && story.title}
      </h4>
      {isPrimary && <p className={'news-item-abstract'}>{story.abstract} </p>}
    </article>
  );
};

const getOffsetIndex = (length, index) => {
  return offset => (index + offset) % length
}
const News = ({news}) =>  {
    if (!news || !!news.fault) {
      return (
        <div className="">
          Error with News Feeds
        </div>
      );
    }
    const [index, setIndex] = useState(0);
      useEffect(() => {
        setTimeout(() => {
          setIndex( index > news.results.length ? 0 : index + 1);
        }, 8000);
        
    });
    const getIndexWithOffset = getOffsetIndex(news.results.length, index);
    return (
      <div className="news relative ">
        <h2
          className={ 'news-title' }
        ><NewsIcon />News</h2>
        
        <div className={''}>
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

export default News;
