import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';
import { auth } from '../../../database/index.js';

const openSelectFile = () => {
  document.getElementById('profile-image-upload').click();
};

const Profile = (props) => {

  return (
    <div className ="profile-div" >

      <div className='avatarContainer'>
        <Image className='avatar'
          src={props.state.loggedInUser.photo || noPhoto}
          roundedCircle
          alt='userPhoto' onClick={openSelectFile}/>
        <div className="avatarBox">
          <div className="changeAvatarText">Change Profile Photo</div>
        </div>
      </div>
      <input id="profile-image-upload" type="file" onChange={props.changeProfileImage}/>

      <div>Username: {props.state.loggedInUser.username}</div>
      <button className = "profile-button">Change Username</button>
      <br></br>
      <div>Email: {props.state.loggedInUser.email}</div>
      <button className = "profile-button">Change Email</button>
      <br></br>
      <div>User ID: {props.state.loggedInUser.userId}</div>

      <button>Change Password</button>
      <br></br>
      <button onClick={() => {
        auth.signOut();
        props.loginLogout(false, null);
        props.history.push('/login');
      }}>logout</button>
    </div>
  );
};

export default withRouter(Profile);