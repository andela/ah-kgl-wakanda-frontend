import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import RatingDisplay from '../Rating/RatingDisplay';
import Bookmark from '../Common/Bookmark/Bookmark';
import staticImage from '../../assets/images/image-display.jpg';

/**
 * Maps articles
 *
 * @param {*} props
 * @returns {object} jsx
 */
const Article = props => {
  const { list } = props;
  const { bookmarkedList } = props;
  const articles = list.map(
    ({
      id,
      images,
      title,
      description,
      readTime,
      favoritesCount,
      Ratings,
      commentsCount,
      slug,
    }) => {
      const bookmarked = bookmarkedList.find(item => slug === item.Article.slug);

      return (
        <div className="article" key={id}>
          <div>
            <div
              className="image"
              style={{ backgroundImage: `url(${images ? images[0] : staticImage})` }}
            >
              <Bookmark slug={slug} bookmarkedSlug={bookmarked ? bookmarked.Article.slug : ''} />
            </div>
            <a href={`articles/${slug}`}>
              <div className="info">
                <div>
                  <div className="title">{title.toString().substr(0, 100)}</div>
                  <div className="description">{description.toString().substr(0, 200)}</div>
                </div>
              </div>
            </a>
          </div>
          <div className="info">
            <div>
              <div className="time">
                <p className="">{readTime}</p>
              </div>
              <div className="options">
                <div className="left">
                  <div className="option">
                    <i>
                      <Icon icon={faThumbsUp} />
                    </i>
                    <span className="">{favoritesCount || 0}</span>
                  </div>
                  <div className="option">
                    <i>
                      <Icon icon={faComment} />
                    </i>
                    <span className="">{commentsCount || 0}</span>
                  </div>
                </div>
                <div className="right">
                  <div className="rating">
                    <RatingDisplay ratings={Ratings} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  );

  return articles;
};

export default Article;
