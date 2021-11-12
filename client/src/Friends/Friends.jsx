import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, ListGroup, Image, ButtonGroup, Button } from 'react-bootstrap';
import EInvite from '../Message/Email.jsx';
import SMSInvite from '../Message/SMS.jsx';
import AddFriend from '../Share/AddFriend.jsx';
import RemoveFriend from '../Share/RemoveFriend.jsx';

const Friends = ({ userId, friends, cb }) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: 'none'
      }}>
      <Card.Body>
        <Card.Title
          className='text-center'
          style={{
            fontSize: '30px'
          }}>
          Friends
        </Card.Title>


        <ButtonGroup
          style={{
            width: '100%',
            marginBottom: '1em'
          }}>
          <Button variant="secondary" disabled>Invite a Friend via</Button>
          <EInvite />
          <SMSInvite />
        </ButtonGroup>

        <AddFriend
          userId={userId}
          cb={cb}/>
        <ListGroup >
          {friends.map((friend, index) => {
            return (
              <ListGroup.Item
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Image
                  src={friend.photo || './anonymous.png'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '100px'
                  }}/>
                <div>{friend.name}</div>
                <RemoveFriend
                  userId={userId}
                  friend={friend}
                  cb={cb}/>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default withRouter(Friends);