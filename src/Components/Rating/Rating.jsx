/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer } from 'react-toastify';
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

  render() {
    return (
      <div className="rate">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        {[...Array(5)].map((v, i) => (
          <React.Fragment>
            <input
              type="radio"
              id={`star${5 - i}`}
              name="rate"
              value={5 - i}
              onChange={this.ratingChange}
            />
            <label htmlFor={`star${5 - i}`} title="text">
              {`${5 - i} stars`}
            </label>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

Rating.propTypes = {
  onRate: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onRate: (rate, slug) => dispatch(rating(rate, slug)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Rating);
