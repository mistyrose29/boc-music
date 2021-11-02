import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteProject } from '../../../../database/controllers.js';

const ConfirmModal = ({ projectId, reload }) => {
  const [smShow, setSmShow] = useState(false);

  const handleClose = () => setSmShow(false);
  const handleShow = () => setSmShow(true);
  const handleSave = () => {
    deleteProject(projectId)
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
        onClick={() => setSmShow(true)}
        style={{
          width: 'fit-content',
          height: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'flex-column',
          padding: '0',
        }}>
        <span
          className="iconify"
          data-icon="octicon:trash-16"
          style={{
            color: 'black',
            width: '16px',
            height: '16px',
          }}/>
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Delete Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>This will delete all files associated with this project. Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;