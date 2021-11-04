import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Multiselect from 'multiselect-react-dropdown';

const share = 'bx:bx-share';

const Share = ({ friends }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (list) => {
    setSelected(list);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow} style={{position: 'fixed', top: '100px', left: '20px'}}>
        <Icon icon={share}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select</Modal.Title>
        </Modal.Header>
        <Multiselect
          options={friends}
          displayValue='username'
          onSelect={onSelect}
          onRemove={onRemove}/>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Share;