/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './Rating.scss';
import rating from '../../actions/rating';

export class Rating extends Component {
  state = {};

  ratingChange = e => {
    const { onRate, slug } = this.props;
    onRate(e.target.value, slug);
  };

  userRating = (ratings = [], id) => {
    const userRating = ratings.find(rate => rate.userId === id);
    if (userRating) return userRating.rate;
    return null;
  };

  render() {
    const { ratings, id, isAuth } = this.props;
    let userRate;
    if (isAuth) userRate = this.userRating(ratings, id);
    return (
      <div className="rate">
        {[...Array(5)].map((v, i) => (
          <React.Fragment key={5 - i}>
            <input
              type="radio"
              id={`star${5 - i}`}
              name="rate"
              defaultChecked={userRate && 5 - i === userRate}
              value={5 - i}
              onChange={this.ratingChange}
            />
            <label htmlFor={`star${5 - i}`} title={5 - i}>
              {`${5 - i} stars`}
            </label>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

Rating.defaultProps = {
  ratings: [],
  slug: '',
  id: null,
};

Rating.propTypes = {
  onRate: PropTypes.func.isRequired,
  ratings: PropTypes.array,
  slug: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  id: PropTypes.number,
};

const mapStateToProps = ({
  currentUser: {
    isAuth,
    user: { id },
  },
  rating: { ratings },
}) => ({
  isAuth,
  id,
  ratings,
});

const mapDispatchToProps = dispatch => ({
  onRate: (rate, slug) => dispatch(rating(rate, slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rating);
