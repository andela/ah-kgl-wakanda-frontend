import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';

import NavBar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';

import Trendings from '../../Components/Articles/Trendings';

import { fetchUserArticles } from '../../actions/fetchArticles';

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
  state = {};

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
   * Renders the component
   *
   * @returns {object} Jsx
   * @memberof UserArticles
   */
  render() {
    const { currentUser, userArticles, loading } = this.props;

    return (
      <div className="page">
        <NavBar displaySearchBox={false} {...this.props} />
        <LoadingBar height={3} progress={!loading ? 0 : 100} color="#f46036" />

        <div className="middle">
          <SideBar user={currentUser} />
          <div className="articles">
            <div className="title">My articles</div>
            <div className="list">
              {userArticles.length > 0 ? (
                <Trendings list={userArticles} />
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
      </div>
    );
  }
}

UserArticles.defaultProps = {
  userArticles: [],
  username: '',
  loading: null,
};

UserArticles.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onFetchUserArticles: PropTypes.func.isRequired,
  userArticles: PropTypes.array,
  username: PropTypes.string,
  loading: PropTypes.bool,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
const mapStateToProps = ({
  articles: { userArticles, loading },
  profile: { user },
  currentUser: {
    user: { username },
  },
}) => {
  return {
    userArticles,
    currentUser: user,
    username,
    loading,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onFetchUserArticles: username => dispatch(fetchUserArticles(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserArticles);
