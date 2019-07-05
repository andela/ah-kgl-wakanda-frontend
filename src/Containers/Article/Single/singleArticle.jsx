import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import LoadingBar from 'react-top-loading-bar';
import { isMobile } from 'mobile-detector';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import Navbar from '../../../Components/NavBar/NavBar';
import checkToken from '../../../helpers/checkToken';
import {
  getArticle,
  likeArticle,
  deleteArticle,
  commentArticle,
  fetchComments,
  deleteComment,
  updateComment,
} from '../../../actions/article';
import Button from '../../../Components/Common/Button/Button';
import Rating from '../../../Components/Rating/Rating';
import RatingDisplay from '../../../Components/Rating/RatingDisplay';
import 'medium-draft/lib/basic.css';
import './singleArticle.scss';
import editIcon from '../../../assets/images/icons/edit.png';
import deleteIcon from '../../../assets/images/icons/delete.png';
import staticImageDisplay from '../../../assets/images/image-display.jpg';
import defaultProfile from '../../../assets/img/blank_profile_pic.png';
import getRatings from '../../../helpers/getRatings';

/**
 *
 * @param {object} props
 * @param {object} main
 * @returns {method} render
 */
export class SingleArticle extends Component {
  state = {
    loadingBarProgress: 0,
    deleted: false,
    contentSetted: false,
    isMyArticle: false,
    body: '',
    updateBody: '',
  };

  componentDidMount = () => {
    const {
      match: {
        params: { slug },
      },
      onGetArticle,
      onFetchComments,
    } = this.props;
    onGetArticle(slug);
    onFetchComments(slug);
    this.setState({ loadingBarProgress: 100 });
  };

  componentWillUpdate = ({ system: { notFound }, article: { userId }, history }) => {
    const { deleted, contentSetted } = this.state;
    if (!contentSetted) {
      if (!!checkToken() && userId === checkToken().id) {
        this.setState({ isMyArticle: true, contentSetted: true });
      }
    }
    if (notFound.status) {
      history.push('/not-found');
    }
    if (deleted && !userId) {
      history.push('/myarticles');
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

  commentBlock = () => {
    const {
      isAuth,
      article: { loading, comments = [] },
      username: currentUsername,
    } = this.props;

    const { body } = this.state;

    /**
     * Toggles the comment textarea
     *
     * @param {*} index
     * @param {*} status
     * @returns {void}
     */
    const toggler = index => {
      this.setState(prevState => ({ [index]: !prevState[index] }));
    };

    return (
      <React.Fragment>
        <div className="form comment-block">
          <div className="comment-label">Comments</div>
          <div className="wrapper" style={{ display: !isAuth ? 'none' : null }}>
            <textarea
              name="comment"
              cols="30"
              rows="10"
              value={body}
              onChange={e => this.setState({ body: e.target.value })}
            />
            <Button text="POST" onClick={() => this.handlePostComment()} loading={loading} />
          </div>
        </div>
        {comments.map(({ body: text, favoritesCount, User: { username, image }, id }, index) => {
          const { state } = this;
          const { updateBody } = state;

          return (
            <div className="comment-card" key={index}>
              <div className="author-details-column">
                <img src={image || defaultProfile} alt="" />
                <div className="names">
                  <h4>{username}</h4>
                </div>
              </div>
              <div className="comments">
                <span>{text}</span>

                <div className="option">
                  <Icon icon={faThumbsUp} />
                  <span className="">{favoritesCount}</span>
                  {currentUsername === username ? (
                    <React.Fragment>
                      <Icon
                        icon={faEdit}
                        onClick={() => {
                          toggler(index);
                        }}
                      />
                      <Icon
                        icon={faTrash}
                        color="#e70000"
                        onClick={() => this.handleDeleteComment(id)}
                      />
                    </React.Fragment>
                  ) : null}
                </div>

                <div
                  className="wrapper edit-comment"
                  style={{ display: !state[index] ? 'none' : 'flex' }}
                >
                  <textarea
                    name="comment"
                    value={updateBody === '' ? text : updateBody}
                    onChange={e => this.setState({ updateBody: e.target.value })}
                  />
                  <div className="bottom">
                    <Button
                      text="POST"
                      onClick={() => this.handleUpdateComment(id)}
                      loading={loading}
                      size={12}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  /**
   *
   * @param {string} slug
   * @returns {method} deleteArticle
   */
  actions = slug => (
    <React.Fragment>
      <Link to={`/articles/${slug}/edit`} href className="action-edit">
        <img src={editIcon} alt="" />
      </Link>
      <button onClick={() => this.deleteArticle(slug)} className="action-delete">
        <img src={deleteIcon} alt="" />
      </button>
    </React.Fragment>
  );

  /**
   *
   * @param {string} slug
   * @returns {method} deleteArticle
   */
  deleteArticle = slug => {
    const { onDeleteArticle } = this.props;
    onDeleteArticle(slug);
    this.setState({ deleted: true });
  };

  /**
   *
   * @returns {jsx} react fragment
   */

  /**
   * Handle post comment action
   *
   * @memberof SingleArticle
   * @returns {void}
   */
  handlePostComment() {
    const {
      onCommentArticle,
      onFetchComments,
      match: {
        params: { slug },
      },
    } = this.props;
    const { body } = this.state;
    onCommentArticle(slug, body).then(res => {
      if (res) {
        this.setState({ body: '' });
        onFetchComments(slug);
      }
    });
  }

  /**
   * Deletes a comment
   *
   * @param {*} id
   * @memberof SingleArticle
   * @returns {void}
   */
  handleDeleteComment(id) {
    const {
      onDeleteComment,
      onFetchComments,
      match: {
        params: { slug },
      },
    } = this.props;
    onDeleteComment(slug, id).then(res => {
      if (res) {
        onFetchComments(slug);
      }
    });
  }

  /**
   * Update a comment
   *
   * @param {*} id
   * @memberof SingleArticle
   * @returns {void}
   */
  handleUpdateComment(id) {
    const {
      onUpdateComment,
      onFetchComments,
      match: {
        params: { slug },
      },
    } = this.props;

    const { updateBody } = this.state;

    onUpdateComment(slug, id, updateBody).then(res => {
      if (res) {
        this.setState({ updateBody: '' });
        onFetchComments(slug);
      }
    });
  }

  /**
   * Renders the single article
   *
   * @returns
   * @memberof SingleArticle
   * @returns {object} Jsx
   */
  render() {
    const {
      article: { title, body, images: imageDisplay, User, slug, favoritesCount, Ratings },
      onlike,
    } = this.props;
    const { loadingBarProgress, isMyArticle } = this.state;

    return (
      <div id="single-article" className="container p-0 mw-100">
        <Navbar {...this.props} />
        <LoadingBar progress={loadingBarProgress} height={3} color="red" />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

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
                <h1>{getRatings(Ratings)}</h1>
                <RatingDisplay ratings={Ratings} color="white" />
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
              {isMyArticle && this.actions(slug)}
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
                <Rating slug={slug} />
                <div className="numbers">
                  <div className="option">
                    <i className="far fa-comment-alt" />
                    <span className="digit">245</span>
                  </div>
                  <div className="option ">
                    <Icon icon={faThumbsUp} id="like" onClick={() => onlike(slug)} />
                    <span className="digit liking">{favoritesCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {slug ? this.commentBlock() : null}
          </div>
        </div>
      </div>
    );
  }
}

SingleArticle.defaultProps = {
  onDeleteArticle: null,
  loading: false,
  username: null,
  comments: [],
};

SingleArticle.propTypes = {
  article: PropTypes.object.isRequired,
  onGetArticle: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func,
  onlike: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  system: PropTypes.object.isRequired,
  onCommentArticle: PropTypes.func.isRequired,
  onFetchComments: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  username: PropTypes.string,
  comments: PropTypes.array,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({
  article,
  system,
  currentUser: {
    isAuth,
    user: { username },
  },
}) => {
  return {
    article,
    system,
    isAuth,
    username,
  };
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  onGetArticle: slug => dispatch(getArticle(slug)),
  onDeleteArticle: slug => dispatch(deleteArticle(slug)),
  onCommentArticle: (slug, body) => dispatch(commentArticle({ slug, body })),
  onFetchComments: slug => dispatch(fetchComments(slug)),
  onDeleteComment: (slug, id) => dispatch(deleteComment({ slug, id })),
  onUpdateComment: (slug, id, body) => dispatch(updateComment({ slug, id, body })),
  onlike: slug => dispatch(likeArticle(slug)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleArticle);
