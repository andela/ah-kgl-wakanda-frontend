import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import LoadingBar from 'react-top-loading-bar';
import { isMobile } from 'mobile-detector';
import { getArticle } from '../../../actions/article';
import Navbar from '../../../Components/NavBar/NavBar';
import 'medium-draft/lib/basic.css';
import './singleArticle.scss';
import lightStarIcon from '../../../assets/images/icons/light-star.png';
import emptyStarIcon from '../../../assets/images/icons/empty-star.png';
import editIcon from '../../../assets/images/icons/edit.png';
import deleteIcon from '../../../assets/images/icons/delete.png';
import staticImageDisplay from '../../../assets/images/image-display.jpg';
import defaultProfile from '../../../assets/images/profile-boy.png';

/**
 *
 * @param {object} props
 * @param {object} main
 * @returns {method} render
 */
export class SingleArticle extends Component {
  state = {
    loadingBarProgress: 0,
  };

  componentDidMount = () => {
    const {
      match: { params },
      onGetArticle,
    } = this.props;
    onGetArticle(params.slug);
    this.setState({ loadingBarProgress: 100 });
  };

  componentWillUpdate = ({ system: { notFound }, history }) => {
    if (notFound.status) {
      history.push('/not-found');
    }
  };

  /**
   *
   * @returns {classes} jsx classes
   */
  getDisplayClasses() {
    return isMobile() ? 'row image-display' : 'row image-display';
  }

  authorInfo = ({ firstname, lastname, username, image: authorImage }, main) => {
    return (
      <React.Fragment>
        <img src={authorImage || defaultProfile} alt="hey" />
        <div className="names">
          <h4>{`${firstname || ''} ${lastname || ''}`}</h4>
          <h6>{`@${username}`}</h6>
          {main && <a href="hello">Follow</a>}
        </div>
      </React.Fragment>
    );
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const {
      article: { title, body, images: imageDisplay, User },
    } = this.props;
    const { loadingBarProgress } = this.state;
    return (
      <div id="single-article" className="container p-0 mw-100">
        <Navbar {...this.props} />
        <LoadingBar progress={loadingBarProgress} height={3} color="red" />
        <div
          className="row image-display"
          style={{
            backgroundImage: imageDisplay
              ? `url(${imageDisplay[0]})`
              : `url(${staticImageDisplay})`,
          }}
        >
          <div className="overlay">
            <div className="col-md-4 ratings">
              <div className="average">
                <h1>4.4</h1>
                <div className="average-icons">
                  <img src={lightStarIcon} alt="" />
                  <img src={lightStarIcon} alt="" />
                  <img src={lightStarIcon} alt="" />
                  <img src={lightStarIcon} alt="" />
                  <img src={emptyStarIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-6 title">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
        <div className="row article-body">
          <div className="col-md-4 body-sidebar">
            <div className="author-details">{this.authorInfo(User || {})}</div>
            <div className="actions">
              <a href="hello" className="action-edit">
                <img src={editIcon} alt="" />
              </a>
              <a href="hello" className="action-delete">
                <img src={deleteIcon} alt="" />
              </a>
              <a href="hello" className="share">
                <i className="fas fa-envelope" />
              </a>
              <a href="hello" className="share">
                <i className="fab fa-facebook" />
              </a>
              <a href="hello" className="share">
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>
          <div className="col-md-6 body-text">
            <div id="content-text">
              {body ? ReactHtmlParser(JSON.parse(body)) : 'No content yet'}
            </div>
            <div className="tags">
              <a href="hello">#Java</a>
              <a href="hello">#Node</a>
              <a href="hello">#Express</a>
            </div>
            <div className="article-info">
              <div className="author-details">{this.authorInfo(User || {}, true)}</div>
              <div className="article-details">
                <div className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="far fa-star" />
                </div>
                <div className="numbers">
                  <div className="option">
                    <i className="far fa-comment-alt" />
                    <span className="digit">245</span>
                  </div>
                  <div className="option">
                    <i className="far fa-thumbs-up" />
                    <span className="digit">245</span>
                  </div>
                  <div className="option">
                    <i className="far fa-thumbs-down" />
                    <span className="digit">34</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  onGetArticle: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  system: PropTypes.object.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ article, system }) => {
  return {
    article,
    system,
  };
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onGetArticle: slug => dispatch(getArticle(slug)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleArticle);
