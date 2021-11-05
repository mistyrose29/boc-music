import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';
import { auth } from '../../../database/index.js';

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
        
        <div className = "friends-title">Username: {props.state.loggedInUser.username}</div>
        <button className = "up-and-down-arrow">Change Username</button>
        <br></br>
        <div className = "friends-title">Email: {props.state.loggedInUser.email}</div> 
        <button className = "up-and-down-arrow">Change Email</button>
        <br></br>
        <div className = "friends-title">User ID: {props.state.loggedInUser.userId}</div>  
   
        <button className = "up-and-down-arrow">Change Password</button>
        <br></br>
        <button className = "up-and-down-arrow"
        onClick={() => {
        auth.signOut();
        props.loginLogout(false, null);
        props.history.push('/login');
      }}>logout</button>
    </div>
  );
};

export default withRouter(Profile);