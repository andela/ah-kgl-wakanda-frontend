import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';

import RatingDisplay from '../Rating/RatingDisplay';

import staticImage from '../../assets/images/image-display.jpg';

/**
 * Trending articles
 *
 * @returns {object} Jsx
 * @param {object} props
 */
const Trendings = props => {
  let { list } = props;

  list = list
    .sort((a, b) => {
      return (a.favoritesCount - b.favoritesCount) * -1;
    })
    .slice(0, 10);

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
      return (
        <Link className="article" key={id} to={`/articles/${slug}`}>
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
            <div>
              <div className="title">{title.toString().substr(0, 100)}</div>
              <div className="description">{description.toString().substr(0, 200)}</div>
            </div>
            <div className="time">
              <p className="read-time-dark">{readTime}</p>
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
        </Link>
      );
    },
  );
  return articles;
};

export default Trendings;
