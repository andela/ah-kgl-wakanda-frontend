import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faStar, faBookmark } from '@fortawesome/free-solid-svg-icons';

import getRatings from '../../helpers/getRatings';

import staticImage from '../../assets/images/image-display.jpg';

/**
 * Maps articles
 *
 * @param {*} props
 * @returns {object} jsx
 */
const Article = props => {
  let { list } = props;
  list = list.reverse().slice(0, 10);

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
      const rate = getRatings(Ratings);

      return (
        <Link className="article" key={id} to={`articles/${slug}`}>
          <div>
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
            </div>
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
                    {[...Array(rate)].map((e, i) => (
                      <i key={i}>
                        <Icon icon={faStar} />
                      </i>
                    ))}
                  </div>
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

export default Article;
