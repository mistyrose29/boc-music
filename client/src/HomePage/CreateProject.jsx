import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateProject = ({title, description, isPublic, create, save, clear }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    save();
    clear();
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          borderRadius: '100px',
          width: '60px',
          height: '60px',
          fontSize: '30px',
          boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.4)'
        }}>
        ＋
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Label>Project Title</Form.Label>

              <Form.Control
                type="title"
                placeholder="Untitled Project"
                name="title"
                value={title}
                onChange={create}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="no description"
                name="description"
                value={description}
                onChange={create}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Make Project Public"
                name="isPublic"
                checked={isPublic}
                onChange={create}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



export default CreateProject;