import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';

import RatingDisplay from '../Rating/RatingDisplay';
import staticImage from '../../assets/images/image-display.jpg';

/**
 * Top article
 *
 * @returns {object} Jsx
 * @param {object} props
 */
const TopArticle = props => {
  const { list } = props;

  let max = 0;

  const article = list.filter(element => {
    if (element.favoriteCount > max) {
      max = element.favoriteCount;
      return true;
    }
    return true;
  });

  const [element] = article;
  if (!element) return null;

  const {
    images,
    Ratings,
    title,
    description,
    favoriteCount,
    readTime,
    commentsCount,
    slug,
  } = element;

  return (
    <a className="article top-article" id="large-article" href={`/articles/${slug}`}>
      <div
        className="image"
        style={{ backgroundImage: `url(${images ? images[0] : staticImage})` }}
      >
        <div className="bookmark">
          <i>
            <Icon icon={faBookmark} />
          </i>
        </div>
      </div>
      <div className="info">
        <div className="title">{title.toString().substr(0, 100)}</div>
        <div className="description">{description.toString().substr(0, 200)}</div>
        <div className="options">
          <div className="left">
            <div className="option">
              <i>
                <Icon icon={faThumbsUp} />
              </i>
              <span className="">{favoriteCount || 0}</span>
            </div>
            <div className="option">
              <i>
                <Icon icon={faComment} />
              </i>
              <span className="">{commentsCount || 0}</span>
            </div>
          </div>
          <div className="right">
            <div className="time">
              <p className="">{readTime}</p>
            </div>
            <div className="rating">
              <RatingDisplay ratings={Ratings} />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

TopArticle.propTypes = {
  list: PropTypes.array.isRequired,
};

export default TopArticle;
