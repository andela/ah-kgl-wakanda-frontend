import axios from 'axios';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Input from '../../Components/Common/input/input';
import { viewProfile, editProfile } from '../../actions/profileActions';
import './Profile.scss';
import NavBar from '../../Components/NavBar/NavBar';
import SideBar from '../../Components/SideBar/SideBar';
import picture from '../../assets/img/blank_profile_pic.png';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ah-wakanda/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'j9eazq6w';

/**
 *
 * @param {event} e
 * @returns {method} render
 */
export class ProfileContainer extends Component {
  state = {
    bio: '',
  };

  fileInput = React.createRef();

  /**
   *
   * @returns {method} form
   */
  componentWillMount() {
    const { onViewProfile, username } = this.props;
    onViewProfile(username);
  }

  onKeyChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  edit = e => {
    e.preventDefault();
    const { onEditProfile, onViewProfile, username } = this.props;
    onEditProfile(this.state, username);
    onViewProfile(username);
  };

  onUpload = e => {
    const file = e.target.files[0];
    this.setState({ [e.selectedFile]: e.target.files[0] });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-ww-form-urlencoded',
      },
      data: formData,
    })
      .then(res => {
        const { user } = this.props;
        user.image = res.data.url;
        this.setState({ user });
        const { onEditProfile } = this.props;
        onEditProfile(user, user.username);
      })
      .catch(err => {
        err.message = 'Please check your internet and reload';
        document.getElementById('message').innerHTML = err.message;
      });
  };

  /**
   * @param {object} props
   * @returns {method} form
   */
  form = () => {
    const { user } = this.props;
    const { bio } = this.state;
    return (
      <form action="#" className="form profile" onSubmit={this.edit}>
        <div className="row">
          <div className="col-sm-5 form-box">
            <Input
              type="text"
              name="firstname"
              label="Frist Name"
              defaultValue={user.firstname || ''}
              placeholder=""
              onType={this.onKeyChange}
            />
          </div>
          <div className="col-sm-5 form-box">
            <Input
              type="text"
              name="lastname"
              label="last Name"
              placeholder=""
              defaultValue={user.lastname || ''}
              onType={this.onKeyChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5 form-box">
            <label htmlFor="bio">
              Bio
              <br />
              <textarea
                id="bio"
                rows="4"
                name="bio"
                cols="39"
                value={bio || user.bio}
                onChange={this.onKeyChange}
              />
            </label>
          </div>
          <div className="col-sm-5 form-box">
            <Input
              type="email"
              name="email"
              label="Email"
              defaultValue={user.email || ''}
              placeholder=""
              onType={this.onKeyChange}
            />
            <button className="button button-register">Edit</button>
          </div>
        </div>
      </form>
    );
  };

  /**
   *
   * @returns {jsx} react fragment
   */
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
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
        <div id="profile">
          <div className="wrapper">
            <div className="row">
              <NavBar
                {...this.props}
                username={user.username}
                picture={user.username}
                currentUser={user}
                displaySearchBox={false}
              />

              <div className="col-sm-2 sideB">
                <SideBar user={user} />
              </div>
              <div className="col-sm-10 form-box bodyProfile">
                <div className="body profile">
                  <div id="pic" className="row">
                    <div className="col-sm-2 form-box pl-4">
                      <div className="p-avatar row big">
                        <div
                          className="avatar-main"
                          style={{
                            backgroundImage: user.image ? `url(${user.image})` : `url(${picture})`,
                          }}
                        >
                          <div
                            className="edit"
                            role="presentation"
                            onClick={() => this.fileInput.current.click()}
                          >
                            <i className="fas fa-pencil-alt" />
                          </div>
                        </div>

                        <input
                          type="file"
                          name="file"
                          className="file-upload"
                          onChange={this.onUpload}
                          ref={this.fileInput}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3 form-box uname">
                      <b>{`${user.firstname || ''} ${user.lastname || ''}`}</b>
                      <br />
                      {`@${user.username}`}
                    </div>
                  </div>
                  {this.form()}
                  <p id="message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProfileContainer.defaultProps = {
  onViewProfile: null,
  onEditProfile: null,
  username: '',
};

ProfileContainer.propTypes = {
  onViewProfile: PropTypes.object,
  user: PropTypes.object.isRequired,
  username: PropTypes.string,
  onEditProfile: PropTypes.object,
};
/**
 *
 * @param {object} state
 * @param {object} currentUser
 * @return {void}
 */
export const mapStateToProps = ({
  profile: { user },
  currentUser: {
    user: { username },
  },
}) => ({ user, username });

/**
 *
 * @param {object} dispatch
 * @returns {method} dispatch
 */
export const mapDispatchToProps = dispatch => ({
  onViewProfile: username => dispatch(viewProfile(username)),
  onEditProfile: (profile, username) => dispatch(editProfile(profile, username)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);
