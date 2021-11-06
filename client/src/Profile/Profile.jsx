import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Card, Image, InputGroup, FormControl, Modal, Button } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';
import { auth } from '../../../database/index.js';

const openSelectFile = () => {
  document.getElementById('profile-image-upload').click();
};

const Profile = (props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeUsernameButtonClicked = () => {
    const newName = username;

    props.changeDisplayName(newName, () => {
      setUsername('');
      handleClose();
    });
  };

  return (
    <div className ="profile-div" >
      <Image
        src={props.state.loggedInUser.photo || noPhoto}
        roundedCircle
        alt='userPhoto' onClick={openSelectFile}
        style={{ cursor: 'pointer' }}
      />
      <input id="profile-image-upload" type="file" onChange={props.changeProfileImage}/>
      <div className = "friends-title">Current Username: {props.state.loggedInUser.name}</div>
      <InputGroup className='mb-3'>
        <FormControl
          value={username}
          id='newUsernameField'
          placeholder='Enter New Username'
          aria-label='Username'
          aria-describedby='basic-addon1'
          onChange={e => setUsername(e.target.value)}
        />
      </InputGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Username Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are attempting to change your username. Please review and confirm the following changes to your account:
          <br></br>
          <br></br>
          Current username: {props.state.loggedInUser.name}
          <br></br>
          New username: {username}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={changeUsernameButtonClicked}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <button className = 'up-and-down-arrow' onClick={handleShow}>Change Username</button>
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
