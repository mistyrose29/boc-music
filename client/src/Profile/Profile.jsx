import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Card, Form, Image, Button, Alert } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';
import { auth } from '../../../database/index.js';

const openSelectFile = () => {
  document.getElementById('profile-image-upload').click();
};

const Profile = (props) => {
  const [username, setUsername] = useState(props.state.loggedInUser.name);
  const [bio, setBio] = useState(props.state.loggedInUser.bio);
  const [updated, setUpdated] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
    setUpdated(true);
  };

  const handleBio = (event) => {
    setBio(event.target.value);
    setUpdated(true);
  };

  const saveChanges = () => {
    setUpdated(false);
    props.changeDisplayName(username, () => {
      props.changeBio(bio, () => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      });
    });
  };

  return (
    <Card
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        margin: 'auto',
        border: 'none'
      }}>
      <Card.Body>
        <Card.Title
          className='text-center profile-top'
          style={{
            fontSize: '30px'
          }}>
          Profile
        </Card.Title>
        <br/>
        <Form>
          <Form.Group
            style={{
              textAlign: 'center'
            }}>
            <Image
              src={props.state.loggedInUser.photo || noPhoto}
              roundedCircle
              alt='userPhoto'
              className="img-fluid"
              onClick={openSelectFile}
              style={{
                width: '200px',
                height: '200px',
                cursor: 'pointer',
                textAlign: 'center'
              }}/>
            <Icon
              className='pencilIcon'
              icon="akar-icons:pencil"
              width="30"
              height="30"
              onClick={openSelectFile}/>
          </Form.Group>
          <input
            id="profile-image-upload"
            type="file"
            onChange={props.changeProfileImage}/>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              value={username}
              onChange={handleUsername}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={bio}
              onChange={handleBio}/>
          </Form.Group>

          <div className="d-grid gap-2">
            {
              alert
                ? <Alert variant='primary'>
                  Saved changes!
                </Alert>
                : updated
                  ? <Button
                    variant="primary"
                    onClick={saveChanges}>
                    Save Changes
                  </Button>
                  : <Button
                    variant="primary">
                      Save Changes
                  </Button>
            }
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default withRouter(Profile);