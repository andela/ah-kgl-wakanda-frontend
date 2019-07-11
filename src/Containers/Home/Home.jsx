import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ToastContainer } from 'react-toastify';

import SweetAlert from 'react-bootstrap-sweetalert';
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './Home.scss';

import NavBar from '../../Components/NavBar/NavBar';

import Button from '../../Components/Common/Button/Button';

import Trendings from '../../Components/Articles/Trendings';
import Article from '../../Components/Articles/Article';
import TopArticle from '../../Components/Articles/TopArticle';

import { fetchArticles, fetchNewFeed } from '../../actions/fetchArticles';
import { signupError } from '../../actions/signupActions';
import updateIsAuth from '../../actions/system';
import getUserInfo from '../../actions/userInfo';
import { viewBookmarked } from '../../actions/getBookmarked';

/**
 * Home component
 *
 * @export
 * @class Home
 * @extends {Component}
 */
export class Home extends Component {
  state = {
    showAlert: true,
    limit: 10,
    offset: 0,
  };

  /**
   * Updates the state
   * Triggers when the component render
   * Updates the state
   *
   * @memberof Home
   * @returns {void}
   */
  componentWillMount() {
    const { onFetchBookmarkedArticles, isAuth, onUpdateIsAuth } = this.props;
    onUpdateIsAuth();
    if (isAuth) {
      onFetchBookmarkedArticles();
    }
  }

  /**
   * Triggers when the component updates
   *
   * @memberof Home
   * @returns {void}
   */
  componentDidMount() {
    document.title = 'Home';
    const { onFetchArticles } = this.props;
    onFetchArticles();
  }

  /**
   * Triggers when the component updates
   *
   * @memberof Home
   * @returns {void}
   */
  componentDidUpdate() {
    document.title = 'Home';
    const {
      onGetUserInfo,
      user: { username },
    } = this.props;
    onGetUserInfo(username);
  }

  /**
   * Updates the state
   *
   * @memberof Home
   * @returns {void}
   */
  componentWillUnmount() {
    const { onSignupError } = this.props;
    onSignupError();
  }

  newData = () => {
    const { onFetchNewFeed } = this.props;
    let { offset } = this.state;
    const { limit } = this.state;
    offset += limit;
    this.setState({ offset });
    onFetchNewFeed(offset, limit);
  };

  /**
   * Displays an success message
   *
   * @returns {object} Jsx
   * @memberof Home
   */
  success() {
    const { showAlert } = this.state;

    return (
      <SweetAlert
        show={showAlert}
        success
        title="Successfully registered!"
        onConfirm={() => this.setState({ showAlert: false })}
      >
        Check your email for account verification.
      </SweetAlert>
    );
  }

  /**
   * Render the component
   *
   * @returns {object} Jsx
   * @memberof Home
   */
  render() {
    const { data, newFeed, loggedIn, isAuth, viewBookmarkArticles } = this.props;
    let { hasMore } = this.props;
    let feed = data;
    feed = [...data, ...newFeed];

    if (data.length < 10) hasMore = false;

    const { bookmarkArticles } = viewBookmarkArticles;
    return (
      <React.Fragment>
        <NavBar {...this.props} />
        <LoadingBar height={3} progress={data.length > 1 ? 0 : 50} color="#f46036" />
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

        {loggedIn ? this.success() : null}

        <div id="home-page">
          <div className="top">
            <div className="landing" style={{ display: isAuth ? 'none' : null }}>
              <div className="left">
                <div className="title">
                  The Power of Visual
                  <br />
                  Story Telling
                </div>

                <div className="description">
                  The world through visual stories. Subscribe,
                  <br />
                  Create, contribute to stories or
                  <br />
                  provide content
                </div>

                <div className="action">
                  <Link to="/signup">
                    <Button text="GET STARTED" size={19} />
                  </Link>
                  <Link to="/login">
                    <Button text="SIGN IN" size={19} outline />
                  </Link>
                </div>
              </div>

              <div className="right">
                <div className="illustration" />
              </div>
            </div>
          </div>

          <div className="articles">
            <div className="left most">
              <div className="navigation" style={{ display: 'none' }}>
                <div className="bar" />
                <Link to="/search/" className="item">
                  | Science
                </Link>
                <Link to="/search/" className="item">
                  | History
                </Link>
                <Link to="/search/" className="item active">
                  | Business
                </Link>
                <Link to="/search/" className="item">
                  | Design
                </Link>
                <Link to="/search/" className="item">
                  | Tech
                </Link>
                <Link to="/search/" className="item">
                  | Life
                </Link>
                <Link to="/search/" className="item">
                  | Food
                </Link>
              </div>

              <TopArticle list={data} bookmarkedList={bookmarkArticles} />

              <InfiniteScroll
                dataLength={feed.length} // This is important field to render the next data
                next={this.newData}
                hasMore={hasMore}
                loader={<Spinner animation="border" size="md" variant="danger" />}
              >
                <div className="cards">
                  {<Article list={feed} bookmarkedList={bookmarkArticles} />}
                </div>
              </InfiniteScroll>
            </div>

            <div className="right trends">
              <div className="trending">
                <h4>Trending Articles</h4>
              </div>
              <div className="cards">
                <Trendings list={data} bookmarkedList={bookmarkArticles} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Home.defaultProps = {
  data: [],
  newFeed: [],
  hasMore: true,
  loggedIn: null,
  isAuth: null,
  user: {},
};

Home.propTypes = {
  data: PropTypes.array,
  newFeed: PropTypes.array,
  hasMore: PropTypes.bool,
  viewBookmarkArticles: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool,
  onFetchArticles: PropTypes.func.isRequired,
  onFetchBookmarkedArticles: PropTypes.func.isRequired,
  onSignupError: PropTypes.func.isRequired,
  onFetchNewFeed: PropTypes.func.isRequired,
  onUpdateIsAuth: PropTypes.func.isRequired,
  onGetUserInfo: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  user: PropTypes.object,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({
  articles: { data, newFeed, hasMore },
  signupState: { loggedIn },
  currentUser: { isAuth, user },
  viewBookmarkArticles,
}) => ({
  data,
  newFeed,
  hasMore,
  loggedIn,
  isAuth,
  viewBookmarkArticles,
  user,
});

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: () => dispatch(fetchArticles()),
    onSignupError: () => dispatch(signupError()),
    onUpdateIsAuth: () => dispatch(updateIsAuth()),
    onGetUserInfo: username => dispatch(getUserInfo(username)),
    onFetchNewFeed: (offset, limit) => dispatch(fetchNewFeed(offset, limit)),
    onFetchBookmarkedArticles: () => dispatch(viewBookmarked()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
