import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const trashcan = 'octicon:trash-16';

const ConfirmModal = ({ deleteTitle, deleteText, cb, cbValue, reload, outline }) => {
  const [smShow, setSmShow] = useState(false);

  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);
  const handleSave = () => {
    cb(cbValue)
      .then(() => {
        console.log('deleted doc');
        reload();
      })
      .catch((error) => {
        console.log('error occured: ', error);
      });
    setSmShow(false);
  };

  return (
    <>
      <Button
        size='sm'
        variant='outline-light'
        onClick={handleShow}>
        <Icon icon={trashcan}/>
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {deleteTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-light" onClick={handleSave}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;