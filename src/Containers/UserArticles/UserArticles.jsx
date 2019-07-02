/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Spinner } from 'react-bootstrap';

import NavBar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';

import Trendings from '../../Components/Articles/Trendings';

import { fetchUserArticles, fetchNewUserArticles } from '../../actions/fetchArticles';

import './UserArticles.scss';

import Button from '../../Components/Common/Button/Button';

/**
 * User article component
 *
 * @export
 * @class UserArticles
 * @extends {Component}
 */
export class UserArticles extends Component {
  state = {
    displayNotification: false,
    limit: 10,
    offset: 0,
  };

  /**
   * Gets user articles
   *
   * @memberof UserArticles
   * @returns {void}
   */
  componentDidMount() {
    document.title = 'My articles';

    const { onFetchUserArticles, username } = this.props;
    onFetchUserArticles(username);
  }

  /**
   * @param {object} props
   * @return {object}
   * s {jsx} react fragment
   */
  componentDidUpdate = ({ system: { successMessage } }) => {
    const { displayNotification } = this.state;
    if (!displayNotification && successMessage.status) {
      toast.success(successMessage.message);
      this.setState({ displayNotification: true });
    }
  };

  newData = () => {
    const { onFetchNewUserArticles, username } = this.props;
    let { offset } = this.state;
    const { limit } = this.state;
    offset += limit;
    this.setState({ offset });
    onFetchNewUserArticles(username, offset, limit);
  };

  /**
   * Renders the component
   *
   * @returns {object} Jsx
   * @memberof UserArticles
   */
  render() {
    const { currentUser, userArticles, newUserArticles, loading } = this.props;
    let { hasMore } = this.props;
    const articles = [...userArticles, ...newUserArticles];
    if (userArticles.length < 10) hasMore = false;
    return (
      <div className="page">
        <NavBar {...this.props} />
        <LoadingBar height={3} progress={!loading ? 0 : 100} color="#f46036" />
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
          <SideBar user={currentUser} />
          <div className="articles">
            <div className="title">My articles</div>

            {userArticles.length > 0 ? (
              <InfiniteScroll
                dataLength={articles.length} // This is important field to render the next data
                next={this.newData}
                hasMore={hasMore}
                loader={<Spinner animation="border" size="md" variant="danger" />}
              >
                <div className="list">
                  <Trendings list={articles} />
                </div>
              </InfiniteScroll>
            ) : (
              <React.Fragment>
                {!loading ? (
                  <div>
                    <div>You do not have any article</div>
                    <Link to="/articles/new">
                      <Button text="Create an article" />
                    </Link>
                  </div>
                ) : null}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserArticles.defaultProps = {
  userArticles: [],
  newUserArticles: [],
  username: '',
  hasMore: true,
  loading: null,
  system: {},
};

UserArticles.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onFetchUserArticles: PropTypes.func.isRequired,
  onFetchNewUserArticles: PropTypes.func.isRequired,
  userArticles: PropTypes.array,
  newUserArticles: PropTypes.array,
  hasMore: PropTypes.bool,
  username: PropTypes.string,
  loading: PropTypes.bool,
  system: PropTypes.object,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
const mapStateToProps = ({
  articles: { userArticles, loading, newUserArticles, hasMore },
  profile: { user },
  currentUser: {
    user: { username },
  },
  system,
}) => {
  return {
    userArticles,
    newUserArticles,
    hasMore,
    currentUser: user,
    username,
    loading,
    system,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onFetchUserArticles: username => dispatch(fetchUserArticles(username)),
  onFetchNewUserArticles: (username, offset, limit) =>
    dispatch(fetchNewUserArticles(username, offset, limit)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserArticles);
