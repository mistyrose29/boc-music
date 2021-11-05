import React from 'react';
import { useState } from 'react';
import { removeFriend } from '../../../database/controllers.js';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const RemoveFriend = ({ userId, friend, cb }) => {
  const handleRemove = (event) => {
    let friendId = event.target.getAttribute('friendid');
    console.log(friendId);
    removeFriend(userId, friendId);
    // reload friends list after removing friend
    setTimeout(cb, 2000);
  };

  return (
    <Button
      friendid={friend.id}
      onClick={handleRemove}>
      {friend.name}
    </Button>
  );
};

export default RemoveFriend;

/*
example usage

<RemoveFriend
  userId={this.state.loggedInUser.userId}
  friend={Object.values(this.state.loggedInUser.friends[0])}
  cb={() => {}}
/>

*/