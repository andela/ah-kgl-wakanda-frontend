import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ImageSideButton, Block, addNewBlock, createEditorState, Editor } from 'medium-draft';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import publishArticle from '../../../actions/article';
import getUser from '../../../actions/userInfo';
import Sidebar from '../../../Components/SideBar/SideBar';
import Navbar from '../../../Components/NavBar/NavBar';
import Button from '../../../Components/Common/Button/Button';
import 'medium-draft/lib/index.css';
import './createArticle.scss';
import 'react-toastify/dist/ReactToastify.css';

let images = [];
let spinner = false;

/**
 *
 * @param {object} editorState
 * @returns {method} render
 */
export class CustomImageSideButton extends ImageSideButton {
  /*
  We will only check for first file and also whether
  it is an image or not.
  */
  onChange = e => {
    spinner = true;
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
      axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const { data } = response;
          spinner = false;
          images = [...images, data.url];
          if (data.url) {
            this.props.setEditorState(
              addNewBlock(this.props.getEditorState(), Block.IMAGE, {
                src: data.url,
              }),
            );
          }
        });
    }
    this.props.close();
  };
}

/**
 *
 * @param {e} e
 * @returns {method} render
 */
export class CreateArticle extends Component {
  state = {
    editorState: createEditorState(),
    loadingBarProgress: 0,
  };

  sideButtons = [
    {
      title: 'Image',
      component: CustomImageSideButton,
    },
  ];

  /**
   * @return {object}
   * s {jsx} react fragment
   */
  componentDidMount() {
    this.refs.editor.focus();
    const { onGetUserInfo, currentUser } = this.props;
    onGetUserInfo(currentUser.user.username);
  }

  /**
   * @param {object} props
   * @return {object}
   * s {jsx} react fragment
   */
  componentWillUpdate = async ({ article, history }) => {
    if (article.title) {
      await setTimeout(() => {
        this.setState({ loadingBarProgress: 1000 });
        history.push(`/articles/${article.slug}`);
      }, 1000);
    }
  };

  /**
   *
   * @param {object} editorState
   * @returns {method} render
   */
  draftOnChange = editorState => {
    this.setState({ editorState });
  };

  /**
   *
   * @param {object} editorState
   * @returns {method} render
   */
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  getArticleContent = () => {
    const { title, editorState } = this.state;
    let body = mediumDraftExporter(editorState.getCurrentContent());
    body = JSON.stringify(body);
    const paragraphs = editorState
      .getCurrentContent()
      .getPlainText()
      .split('\n');
    const firstParagraph = paragraphs.find(paragraph => paragraph);
    if (images.length === 0) {
      return {
        title,
        description: firstParagraph,
        body,
      };
    }
    return {
      title,
      description: firstParagraph,
      body,
      images,
    };
  };

  publish = e => {
    e.preventDefault();
    this.setState({ loadingBarProgress: 30 });
    const article = this.getArticleContent();
    const { onPublishArticle } = this.props;
    onPublishArticle(article);
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const { profile } = this.props;

    const { editorState, loadingBarProgress } = this.state;
    return (
      <div className="article-create">
        <Navbar {...this.props} />
        <LoadingBar progress={loadingBarProgress} height={3} color="red" />
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
        <div className="row">
          <div className="col-md-2">
            <Sidebar user={profile.user} />
          </div>
          <div className="col-md-10 content">
            <div className="body">
              <div className="header">
                <div className="left">
                  <h2>New Article</h2>
                  <p>Use our editor to write your article</p>
                </div>
                <div className="right">
                  <Button text="PUBLISH" icon={faFeather} onClick={this.publish} />
                </div>
              </div>
              <form onSubmit={this.publish}>
                <input type="text" name="title" placeholder="Title" onChange={this.handleInput} />
                <div className="containey" style={{ display: spinner ? null : 'none' }}>
                  <div className="canvas canvas1">
                    <div className="spinner1 spinnerMax">
                      <div className="spinner1 spinnerMid">
                        <div className="spinner1 spinnerMin" />
                      </div>
                    </div>
                  </div>
                </div>
                <Editor
                  ref="editor"
                  editorState={editorState}
                  onChange={this.draftOnChange}
                  sideButtons={this.sideButtons}
                  webDriverTestID="foo"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateArticle.defaultProps = {
  onGetUserInfo: null,
};

CreateArticle.propTypes = {
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  onPublishArticle: PropTypes.func.isRequired,
  onGetUserInfo: PropTypes.func,
  history: PropTypes.object.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ profile, currentUser, article }) => {
  return {
    profile,
    currentUser,
    article,
  };
};

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onPublishArticle: credentials => dispatch(publishArticle(credentials)),
  onGetUserInfo: username => dispatch(getUser(username)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateArticle);
