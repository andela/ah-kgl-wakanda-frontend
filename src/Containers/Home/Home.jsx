import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import SweetAlert from 'react-bootstrap-sweetalert';
import LoadingBar from 'react-top-loading-bar';

import NavBar from '../../Components/NavBar/NavBar';

import Button from '../../Components/Common/Button/Button';
import './Home.scss';

import Trendings from '../../Components/Articles/Trendings';
import Article from '../../Components/Articles/Article';
import TopArticle from '../../Components/Articles/TopArticle';

import { fetchArticles } from '../../actions/fetchArticles';
import { signupError } from '../../actions/signupActions';

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
  };

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
   * Updates the state
   *
   * @memberof Home
   * @returns {void}
   */
  componentWillUnmount() {
    const { onSignupError } = this.props;
    onSignupError();
  }

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
    const { data, loggedIn, isAuth } = this.props;

    return (
      <React.Fragment>
        <NavBar {...this.props} />
        <LoadingBar height={3} progress={data.length > 1 ? 0 : 50} color="#f46036" />

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

              <TopArticle list={data} />

              <div className="cards">
                <Article list={data} />
              </div>
            </div>

            <div className="right trends">
              <div className="trending">
                <h4>Trending Articles</h4>
              </div>
              <div className="cards">
                <Trendings list={data} />
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
  loggedIn: null,
  isAuth: null,
};

Home.propTypes = {
  data: PropTypes.array,
  loggedIn: PropTypes.bool,
  onFetchArticles: PropTypes.func.isRequired,
  onSignupError: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
const mapStateToProps = ({
  articles: { data },
  signupState: { loggedIn },
  currentUser: { isAuth },
}) => {
  return {
    data,
    loggedIn,
    isAuth,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: () => dispatch(fetchArticles()),
    onSignupError: () => dispatch(signupError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
