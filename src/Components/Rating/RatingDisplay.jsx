import React from 'react';
import { PropTypes } from 'prop-types';
import getRatings from '../../helpers/getRatings';

/**
 *
 * @param {object} props
 * @param {object} main
 * @returns {method} render
 */
const RatingDisplay = props => {
  const { ratings, color } = props;
  const rate = Math.round(getRatings(ratings));
  return (
    <div className="average-icons">
      <div className="rating" style={{ color }}>
        {[...Array(5)].map((e, i) => {
          if (i < rate) return <i key={i} className="fas fa-star" />;
          return <i key={i} className="far fa-star" />;
        })}
      </div>
    </div>
  );
};

RatingDisplay.defaultProps = {
  ratings: [],
  color: '#f46036',
};

RatingDisplay.propTypes = {
  ratings: PropTypes.array,
  color: PropTypes.string,
};

export default RatingDisplay;
