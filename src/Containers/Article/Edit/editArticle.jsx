import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ImageSideButton, Block, addNewBlock, createEditorState, Editor } from 'medium-draft';
import { convertToRaw } from 'draft-js';
import mediumDraftImporter from 'medium-draft/lib/importer';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import 'medium-draft/lib/index.css';
import { getArticle, updateArticle } from '../../../actions/article';
import getUser from '../../../actions/userInfo';
import Sidebar from '../../../Components/SideBar/SideBar';
import Navbar from '../../../Components/NavBar/NavBar';
import Button from '../../../Components/Common/Button/Button';
import './editArticle.scss';

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
export class EditArticle extends Component {
  state = {
    title: '',
    editorState: createEditorState(),
    loadingBarProgress: 0,
    contentSetted: false,
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
    const {
      onGetUserInfo,
      currentUser,
      onGetArticle,
      match: {
        params: { slug },
      },
    } = this.props;
    onGetUserInfo(currentUser.user.username);
    onGetArticle(slug);
  }

  /**
   * @param {object} props
   * @return {object}
   * s {jsx} react fragment
   */
  componentWillUpdate = async ({ article, history }) => {
    const { publish, contentSetted } = this.state;
    if (article.title) {
      const { title, body } = article;
      if (!contentSetted) {
        await setTimeout(() => {
          this.setState({
            loadingBarProgress: 1000,
            title,
            editorState: createEditorState(convertToRaw(mediumDraftImporter(JSON.parse(body)))),
            contentSetted: true,
          });
        }, 1000);
      }
      if (publish) {
        history.push(`/articles/${article.slug}`);
      }
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
    return {
      title,
      description: firstParagraph,
      body,
    };
  };

  publish = e => {
    e.preventDefault();
    const {
      onUpdateArticle,
      match: {
        params: { slug },
      },
    } = this.props;
    this.setState({ loadingBarProgress: 30, publish: true });
    const article = this.getArticleContent();
    onUpdateArticle(slug, article);
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const { profile } = this.props;
    const { title, editorState, loadingBarProgress } = this.state;
    return (
      <div className="article-create article-edit">
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
                  <h2>Edit Article</h2>
                  <p>Use our editor to write your article</p>
                </div>
                <div className="right">
                  <Button text="PUBLISH" icon={faFeather} onClick={this.publish} />
                </div>
              </div>
              <form onSubmit={this.publish}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.handleInput}
                />
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

EditArticle.defaultProps = {
  onGetUserInfo: null,
  onGetArticle: null,
};

EditArticle.propTypes = {
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onUpdateArticle: PropTypes.func.isRequired,
  onGetUserInfo: PropTypes.func,
  onGetArticle: PropTypes.func,
  history: PropTypes.object.isRequired,
};

/**
 *
 * @param {object} state
 * @returns {object} props
 */
const mapStateToProps = ({ profile, currentUser, article }) => ({
  profile,
  currentUser,
  article,
});

/**
 *
 * @param {*} dispatch
 * @returns {object} props
 */
const mapDispatchToProps = dispatch => ({
  onUpdateArticle: (slug, article) => dispatch(updateArticle(slug, article)),
  onGetUserInfo: username => dispatch(getUser(username)),
  onGetArticle: slug => dispatch(getArticle(slug)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditArticle);
