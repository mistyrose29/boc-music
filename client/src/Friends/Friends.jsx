import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Modal, Tabs, Tab, Form, ListGroup} from 'react-bootstrap';




const Friends = (props) => {

  const [show, setShow] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [clickedFriend, setClickedFriend] = useState('');
  const [clickedFriendId, setClickedFriendId] = useState('');
  const [search, setSearch] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [firstFriendIndex, setFirstFriendIndex] = useState(0);

const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const handleShowFriend = () => setShowFriend(true);
const handleCloseFriend = () => setShowFriend(false);

const handleChange = (event) => {
    let term = event.target.value;
    setSearch(term);
  };

  const handleChangeEmail = (event) => {
    let term = event.target.value;
    setSearchEmail(term);
  };

const handleClickedFriend = (event) => {
    let friend = event.target.innerText
    setClickedFriend(friend)
    setClickedFriendId(event.target.attributes[0].value)
    handleShowFriend()
}
const sendFriendRequest = () => {
    props.addFriend(searchEmail)
}

const removeFriend = () => {
    props.removeFriend(clickedFriendId)
}

const upArrow = () => {
    let newIndex = firstFriendIndex - 10;
    setFirstFriendIndex(newIndex)
}

const downArrow = () => {
    let newIndex = firstFriendIndex + 10;
    setFirstFriendIndex(newIndex)
}

var friendsList = Object.values(props.state.loggedInUser.friends);
console.log(friendsList)
// var friendsList = [{username: 'Frankenstein', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
// {username: 'Dracula', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
// {username: 'Drake', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
// {username: 'Drake', email: 'quinnlima1@gmail.com'}, {username: 'Drake', email: 'quinnlima1@gmail.com'}, {username: 'Drake', email: 'quinnlima1@gmail.com'}, {username: 'Drake', email: 'quinnlima1@gmail.com'},
// {username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'Drake', email: 'quinnlima1@gmail.com'},{username: 'and Josh', email: 'quinnlima1@gmail.com'}];

  return (
    <div>
        <div className = "friends-list">
      
      <h3 className = "friends-title">Friends List</h3>
      {(function () {
            //console.log('number of photos', props.state.styles[props.OverviewState.styleIndex].photos.length)
            if (firstFriendIndex > 0) {
              return (
                <Button className="up-and-down-arrow" onClick={upArrow}>
                  ^
                </Button>
              );
            }
          })()}
      <ListGroup >
            {function() {
                if (friendsList.length == 0) {
                  return null
                } else {

                  let list = [];
                  let lastFriendIndex = firstFriendIndex + 10;
                  if (firstFriendIndex + 10 > friendsList.length) {
                    lastFriendIndex = friendsList.length;
                  }
                  for (let i = firstFriendIndex; i < lastFriendIndex; i++) {
                    list.push(<ListGroup.Item className = "friends-list-ol" value = {friendsList[i].id} key = {i} onClick = {handleClickedFriend}>{friendsList[i].name}</ListGroup.Item>)
                  }
                  return list;
                }
            }()}
       </ListGroup>
        {(function () {
            if (
              firstFriendIndex + 10 < friendsList.length) {
              return (
                <Button className="up-and-down-arrow" onClick={downArrow}>
                  v
                </Button>
              );
            }
          })()}
        
      <Button className = "up-and-down-arrow" onClick = {handleShow}>Add Friend</Button>
      {function () {
        if (friendsList.length > 0) {
          return (

            <Modal show={showFriend} onHide={handleCloseFriend}>
        <Modal.Header closeButton>
          <Modal.Title>{clickedFriend}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button variant="primary" onClick={removeFriend}>
            Remove Friend
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
            )
      } else {
        return null
      }
      }()}
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Friend Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3-top" controlId="formBasicEmail">
              <Form.Control type="title" placeholder="Enter Email" onChange={handleChangeEmail} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={sendFriendRequest}>
            Send Friend Request
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      </div>
    </div>
  );
};

export default withRouter(Friends);

<ListGroup>
  <ListGroup.Item>Cras justo odio</ListGroup.Item>
  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
  <ListGroup.Item>Morbi leo risus</ListGroup.Item>
  <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
</ListGroup>