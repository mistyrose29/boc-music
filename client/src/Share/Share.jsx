import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Multiselect from 'multiselect-react-dropdown';
import { shareProjectWith } from '../../../database/controllers.js';

const share = 'bx:bx-share';

const Share = ({ userId, projectId, friends, sharedWith, reload }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClose = () => {
    setSelected([]);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const onChange = (list) => {
    setSelected(list);
  };

  const handleShare = () => {
    let ids = selected.map(user => user.id);
    shareProjectWith(userId, projectId, ids);
    setSelected([]);
    setShow(false);
    reload();
  };

  const getSharedWith = () => {
    return friends.filter((friend) => {
      return sharedWith.includes(friend.id);
    });
  };

  const getNotSharedWith = () => {
    return friends.filter((friend) => {
      return !sharedWith.includes(friend.id);
    });
  };

  return (
    <>
      <Button
        size='sm'
        variant='outline-light'
        onClick={handleShow}>
        <Icon icon={share}/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share with Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select friends that you would like to share this project with</p>
          <Multiselect
            options={getNotSharedWith()}
            selectedValues={getSharedWith()}
            displayValue='name'
            onSelect={onChange}
            onRemove={onChange}/>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-light'
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='outline-light'
            onClick={handleShare}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Share;