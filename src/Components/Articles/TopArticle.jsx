import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import Bookmark from '../Common/Bookmark/Bookmark';
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
  const { bookmarkedList } = props;
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

  const bookmarked = bookmarkedList.find(item => slug === item.Article.slug);

  return (
    <div className="article top-article" id="large-article">
      <div
        className="image"
        style={{ backgroundImage: `url(${images ? images[0] : staticImage})` }}
      >
        <Bookmark slug={slug} bookmarkedSlug={bookmarked ? bookmarked.Article.slug : ''} />
      </div>
      <div className="info">
        <a href={`/articles/${slug}`}>
          <div className="title">{title.toString().substr(0, 100)}</div>
          <div className="description">{description.toString().substr(0, 200)}</div>
        </a>
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
    </div>
  );
};

TopArticle.propTypes = {
  list: PropTypes.array.isRequired,
  bookmarkedList: PropTypes.array,
};

TopArticle.defaultProps = {
  bookmarkedList: [],
};

export default TopArticle;
