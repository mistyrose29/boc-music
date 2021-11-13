import React from 'react';
import { useState } from 'react';
import { removeFriend } from '../../../database/controllers.js';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const RemoveFriend = ({ userId, friend, cb }) => {
  const [smShow, setSmShow] = useState(false);

  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);

  const handleRemove = () => {
    handleClose();
    removeFriend(userId, friend.id);
    setTimeout(cb, 2000);
  };

  return (
    <>
      <Button
        size='sm'
        variant='outline-light'
        onClick={handleShow}>
        <Icon icon='octicon:trash-16'/>
      </Button>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Remove Friend
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove "{friend.name}" as a friend?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-light" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveFriend;
