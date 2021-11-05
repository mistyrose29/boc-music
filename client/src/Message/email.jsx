import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';


const EmailInvite = (props) => {

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Invite A Friend!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This is a test!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

};

const Invite = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = (name, email) => {

  };

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Email Invite
      </Button>

      <EmailInvite
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Invite;