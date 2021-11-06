import React, {useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';


const TextInvite = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = (e) => {
    let newName = e.target.value;
    setName(newName);
  };

  const handleChangeNumber = (e) => {
    let newNumber = e.target.value;
    setNumber(newNumber);
  };

  const handleSend = () => {
    const invite = {
      sms: number,
      name: name
    };

    // console.log(invite);

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
            <Form.Control type="title" placeholder="Enter Telephone Number" onChange={handleChangeNumber}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSend}>Send Invite</Button>
        <Button onClick={props.onHide}>Cancel Invite</Button>
      </Modal.Footer>
    </Modal>
  );

};

const SMSInvite = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        SMS Invite
      </Button>

      <TextInvite
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default SMSInvite;