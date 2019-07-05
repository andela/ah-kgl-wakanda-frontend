import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Trendings from '../../../Components/Articles/Trendings';
import NavBar from '../../../Components/NavBar/NavBar';
import Button from '../../../Components/Common/Button/Button';
import SideBar from '../../../Components/SideBar/SideBar';
import { viewBookmarked } from '../../../actions/getBookmarked';
import './bookmarked.scss';

/**
 * User bookarked articles component
 *
 * @export
 * @class UserArticles
 * @extends {Component}
 */
class BookmarkedArticles extends Component {
  state = {};

  /**
   * Gets user articles
   *
   * @memberof UserArticles
   * @returns {void}
   */
  componentDidMount() {
    document.title = 'Bookmarked articles';

    const { onGetBookmarkedArticles } = this.props;
    onGetBookmarkedArticles();
  }

  /**
   * Render List of Bookmarked articles
   *
   * @param {Array} articles
   * @param {Array} bookmarkArticles
   * @returns {void}
   */
  renderList(articles, bookmarkArticles) {
    if (articles.length > 0) {
      return (
        <div className="list">
          <Trendings list={articles} bookmarkedList={bookmarkArticles} />
        </div>
      );
    }
    return (
      <Link href to="/">
        <Button text="Browse" icon={faClipboardList} />
      </Link>
    );
  }

  /**
   * Gets user articles
   *
   * @memberof UserArticles
   * @returns {void}
   */

  /**
   * Renders the component
   *
   * @returns {object} Jsx
   * @memberof UserArticles
   */
  render() {
    const {
      profile: { user },
      viewBookmarkArticles: { bookmarkArticles },
    } = this.props;
    const articles = bookmarkArticles.map(({ Article }) => {
      return {
        ...Article,
      };
    });
    return (
      <div className="boorkmarked-articles">
        <NavBar {...this.props} />
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
        <div className="middle">
          <SideBar user={user} />
          <div className="articles">
            <div className="title">Bookmarked articles</div>
            {this.renderList(articles, bookmarkArticles)}
          </div>
        </div>
      </div>
    );
  }
}

BookmarkedArticles.defaultProps = {
  onGetUserInfo: null,
};

BookmarkedArticles.propTypes = {
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  viewBookmarkArticles: PropTypes.object.isRequired,
  onGetBookmarkedArticles: PropTypes.func.isRequired,
  onGetUserInfo: PropTypes.func,
  history: PropTypes.object.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ profile, currentUser, viewBookmarkArticles }) => {
  return {
    profile,
    currentUser,
    viewBookmarkArticles,
  };
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onGetBookmarkedArticles: () => dispatch(viewBookmarked()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookmarkedArticles);
