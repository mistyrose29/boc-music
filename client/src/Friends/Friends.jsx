import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';




const Friends = (props) => {
  const [show, setShow] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [clickedFriend, setClickedFriend] = useState('');
  const [search, setSearch] = useState('');
  const [firstFriendIndex, setFirstFriendIndex] = useState(0);

const handleShow = () => setShow(true);
const handleClose = () => setShow(false);
const handleShowFriend = () => setShowFriend(true);
const handleCloseFriend = () => setShowFriend(false);

const handleChange = (event) => {
    let term = event.target.value;
    setSearch(term);
  };

const handleClickedFriend = (event) => {
    let friend = event.target.innerText
    setClickedFriend(friend)
    handleShowFriend()
}
const sendFriendRequest = () => {
    props.addFriend(search)
}

const removeFriend = () => {
    props.removeFriend(clickedFriend)
}

const upArrow = () => {
    let newIndex = firstFriendIndex - 10;
    setFirstFriendIndex(newIndex)
}

const downArrow = () => {
    let newIndex = firstFriendIndex + 10;
    setFirstFriendIndex(newIndex)
}

var friendsList = [{username: 'Frankenstein', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
{username: 'Dracula', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
{username: 'Drake', email: 'quinnlima1@gmail.com', userPhoto: 'https://lh3.googleusercontent.com/a/AATXAJxn3fSR2qsoN7YOjH4Q6_dCmJuyoNeMTqcmAkTR=s96-c', userId: 'AKCtFiHxrcbZifYQTEkstmvR0ym2'},
{username: 'Drake'}, {username: 'Drake'}, {username: 'Drake'}, {username: 'Drake'},
{username: 'Drake'},{username: 'Drake'},{username: 'Drake'},{username: 'Drake'},{username: 'Drake'},{username: 'Drake'},{username: 'Drake'},{username: 'and Josh'}];

  return (
    <div>
        <div className = "friends-list">
      
      <h3 className = "friends-title">Friends List</h3>
      {(function () {
            //console.log('number of photos', props.state.styles[props.OverviewState.styleIndex].photos.length)
            if (firstFriendIndex > 0) {
              return (
                <button className="up-and-down-arrow" onClick={upArrow}>
                  ^
                </button>
              );
            }
          })()}
      <ol className = "friends-list-ol">
            {function() {
                let list = [];
                let lastFriendIndex = firstFriendIndex + 10;
                if (firstFriendIndex + 10 > friendsList.length) {
                    lastFriendIndex = friendsList.length;
                }
                for (let i = firstFriendIndex; i < lastFriendIndex; i++) {
                    list.push(<li value = {i + 1} key = {i} onClick = {handleClickedFriend}>{friendsList[i].username}</li>)
            }
            return list;
            }()}
        </ol>
        {(function () {
            if (
              firstFriendIndex + 10 < friendsList.length) {
              return (
                <button className="up-and-down-arrow" onClick={downArrow}>
                  v
                </button>
              );
            }
          })()}
        
      <button className = "up-and-down-arrow" onClick = {handleShow}>Add Friend</button>

      <Modal show={showFriend} onHide={handleCloseFriend}>
        <Modal.Header closeButton>
          <Modal.Title>{clickedFriend}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={removeFriend}>
            Remove Friend
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Friend Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3-top" controlId="formBasicEmail">
              <Form.Control type="title" placeholder="Search Username" onChange={handleChange} />
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