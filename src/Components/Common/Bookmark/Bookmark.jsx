/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { bookmark } from '../../../actions/bookmark';
import { unBookmark } from '../../../actions/unbookmark';

/**
 * @class Bookmark
 * @extends {Component}
 */
export class Bookmark extends Component {
  /**
   *Creates an instance of Bookmark.
   * @param {*} props
   * @memberof Bookmark
   */
  constructor(props) {
    super(props);
    const { onBookmark, onUnbookmark, slug, bookmarkArticle, isAuth } = this.props;
    this.bookmarkArticle = bookmarkArticle;
    this.isAuth = isAuth;
    this.onBookmark = onBookmark;
    this.onUnbookmark = onUnbookmark;
    this.slug = slug;
    this.state = {
      isBookmarked: undefined,
      componentUpdate: false,
    };
  }

  /**
   * trigger when component render
   * @memberof Bookmark
   * @returns {void}
   */
  componentWillMount() {
    const { bookmarkedSlug } = this.props;
    if (this.slug === bookmarkedSlug) {
      this.setState({
        isBookmarked: true,
      });
    }
  }

  /**
   * trigger when component render
   * @memberof Bookmark
   * @returns {void}
   */
  componentDidUpdate() {
    const { componentUpdate } = this.state;
    const { bookmarkedSlug } = this.props;
    if (!componentUpdate && this.slug === bookmarkedSlug) {
      this.setState({
        componentUpdate: true,
        isBookmarked: true,
      });
    }
  }

  /**
   * @param {Event} e
   * @param {string} slug
   *
   * @memberof Bookmark
   * @returns {void}
   */
  bookmark = e => {
    e.preventDefault();
    const { isBookmarked } = this.state;
    const { bookmarkedSlug } = this.props;

    // if the article is not bookmarked
    if (!isBookmarked) {
      this.onBookmark(this.slug).then(() => {
        this.setState({
          isBookmarked: true,
          componentUpdate: true,
        });
      });

      return;
    }

    // if the article is bookmarked
    if (this.slug === bookmarkedSlug || isBookmarked) {
      this.onUnbookmark(this.slug).then(() => {
        this.setState({
          isBookmarked: false,
          componentUpdate: true,
        });
      });
    }
  };

  /**
   * render the component
   * @returns {object} jsx
   * @memberof Bookmark
   */
  render() {
    const { isBookmarked } = this.state;
    return this.isAuth ? (
      <div
        className={isBookmarked ? 'bookmark bookmarked' : 'bookmark'}
        role="button"
        tabIndex="-1"
        onKeyDown={() => null}
        onClick={this.bookmark}
      >
        <i>
          <FontAwesomeIcon icon={faBookmark} />
        </i>
      </div>
    ) : null;
  }
}

Bookmark.propTypes = {
  bookmarkArticle: PropTypes.object.isRequired,
  bookmarkedSlug: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onUnbookmark: PropTypes.func.isRequired,
  isAuth: PropTypes.any.isRequired,
  slug: PropTypes.string.isRequired,
};

Bookmark.defaultProps = {
  bookmarkedSlug: '',
};

/**
 * @param {object} state
 * @returns {object} props
 */
export const mapStateToProps = ({ bookmarkArticle, currentUser: { isAuth } }) => ({
  bookmarkArticle,
  isAuth,
});

/**
 * @param {function} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onBookmark: slug => dispatch(bookmark(slug)),
  onUnbookmark: slug => dispatch(unBookmark(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmark);
