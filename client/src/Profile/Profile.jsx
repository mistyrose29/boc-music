import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';
import { auth } from '../../../database/index.js';

const Profile = (props) => {
    console.log(props.state.loggedInUser)

  return (
    <div className ="profile-div" >
       <Image 
          src={props.state.loggedInUser.userPhoto || noPhoto}
          roundedCircle
          alt='userPhoto'/>
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