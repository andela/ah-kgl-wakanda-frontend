import axios from 'axios';
// import cloudinary from 'cloudinary';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
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
class Profile extends Component {
  state = {
    newBio: '',
  };

  fileInput = React.createRef();

  /**
   *
   * @returns {method} form
   */
  componentWillMount() {
    const { onViewProfile } = this.props;
    const username = localStorage.getItem('username');
    onViewProfile(username);
  }

  onKeyChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  edit = e => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    const { onEditProfile, onViewProfile } = this.props;
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
        console.log('err :', err);
      });
  };

  /**
   * @param {object} props
   * @returns {method} form
   */
  form = () => {
    const { user } = this.props;
    const { newBio } = this.state;
    return (
      <form action="#" className="form" onSubmit={this.edit}>
        <div className="row">
          <div className="col-sm-5 form-box">
            <Input
              type="text"
              name="firstname"
              label="Frist Name"
              defaultValue={user.firstname || ''}
              placeholder=""
              onType={this.onKeyChange}
              required
            />
          </div>
          <div className="col-sm-5 form-box">
            <Input
              type="text"
              name="lastname"
              label="last Name"
              placeholder=""
              defaultValue={user.lastname}
              onType={this.onKeyChange}
              required
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
                name="newBio"
                cols="39"
                value={newBio || user.bio}
                onChange={this.onKeyChange}
                required
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
              required
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
      <div id="profile">
        <div className="wrapper">
          <div className="row">
            <NavBar currentUser={user} />
            <div className="col-sm-2">
              <SideBar user={user} />
            </div>
            <div className="col-sm-10 form-box">
              <div className="body">
                <div id="pic" className="row">
                  <div className="col-sm-2 form-box pl-4">
                    <div className="p-avatar row ">
                      <div
                        className="avatar-main"
                        style={{
                          backgroundImage: user.image ? `url(${user.image})` : `url(${picture})`,
                        }}
                      />
                      <div
                        className="edit"
                        role="presentation"
                        onClick={() => this.fileInput.click()}
                      >
                        <i className="fas fa-pencil-alt" />
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
                    <b>
                      {user.firstname || ''}
                      {user.lastname || ''}
                    </b>
                    <br />
                    {`@${user.username}`}
                  </div>
                </div>
                {this.form()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  onViewProfile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onEditProfile: PropTypes.object.isRequired,
};
/**
 *
 * @param {object} state
 * @return {void}
 */
const mapStateToProps = ({ profile: { user } }) => ({ user });

/**
 *
 * @param {object} dispatch
 * @returns {method} dispatch
 */
const mapDispatchToProps = dispatch => ({
  onViewProfile: username => {
    dispatch(viewProfile(username));
  },
  onEditProfile: (profile, username) => {
    dispatch(editProfile(profile, username));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
