import React from 'react';
import { useState } from 'react';
import { Button, Offcanvas, ListGroup, Image } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { auth } from '../../../database/index.js';
import { withRouter } from 'react-router-dom';

const threeBars = 'octicon:three-bars-16';

const NavPane = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = (event) => {
    if (!event) {
      setShow(false);
      return;
    }

    const route = event.target.getAttribute('route');

    if (route === '/login') {
      auth.signOut();
      props.loginLogout(false, null, () => {
        props.history.push('/login');
      });
    } else {
      props.history.push(route);
      setShow(false);
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{
          backgroundColor: 'rgba(256, 256, 256, 0.6)',
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 5
        }}
        size='sm'
        variant='outline-dark'
        onClick={handleShow}>
        <Icon icon={threeBars}/>
      </Button>

      <Offcanvas size='sm' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Image
            src={'./musicsharelogo2.png'}
            fluid
          />
          <Button
            route='/home'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Home
          </Button>
          <br/>
          <Button
            route='/profile'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Profile
          </Button>
          <br/>
          <Button
            route='/projects'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Projects
          </Button>
          <br/>
          <Button
            route='/waveform'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Waveform
          </Button>
          <br/>
          <Button
            route='/friends'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Friends
          </Button>
          <br/>
          <Button
            route='/login'
            variant='outline-light'
            style={{ border: 'none' }}
            onClick={handleClose}>
            Logout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default withRouter(NavPane);