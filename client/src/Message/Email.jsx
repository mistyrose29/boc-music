import React, {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';


const EmailInvite = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleChangeName = (e) => {
    let newName = e.target.value;
    setName(newName);
  };

  const handleChangeEmail = (e) => {
    let newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleSend = () => {
    const invite = {
      email: email,
      name: name
    };

    console.log(invite);

    axios.post('http://localhost:3000/invite', invite)
      .then(response => console.log(response.data))
      .catch(error => console.log('There was an error: ', error));

    props.onHide();
  };

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
        <Form>
          <Form.Group className="mb-3-top" controlId="formBasicEmail">
            <Form.Control type="title" placeholder="Enter Name" onChange={handleChangeName}/>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group className="mb-3-top" controlId="formBasicEmail">
            <Form.Control type="title" placeholder="Enter Email" onChange={handleChangeEmail}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.onHide}>
            Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSend}>
            Send
        </Button>
      </Modal.Footer>
    </Modal>
  );

};

const EInvite = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setModalShow(true)}>
        Email
      </Button>

      <EmailInvite
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default EInvite;