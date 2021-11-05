import React from 'react';
import { useState } from 'react';
import { addFriend } from '../../../database/controllers.js';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const AddFriend = ({ userId, cb }) => {
  const [email, setEmail] = useState('');
  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAdd = () => {
    addFriend(userId, email);
    setTimeout(cb, 2000);
    setEmail('');
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter Email..."
        aria-label="email"
        aria-describedby="basic-addon1"
        onChange={onChange}
        value={email}/>
      <Button
        onClick={handleAdd}>
          Add Friend
      </Button>
    </InputGroup>
  );
};

export default AddFriend;