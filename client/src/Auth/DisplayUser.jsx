import React from 'react';
import { auth } from '../../../database/index.js';
import { Card, Image } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';

export default function DisplayUser(props) {
  return (
    <Card className="text-center" style={{border: 'none'}}>
      <Card.Body>
        <Image
          src={props.photo || noPhoto}
          roundedCircle
          alt='user photo'/>
        <Card.Title>
          <br/>
          Hello
        </Card.Title>
        <Card.Text>
          {props.name || noUser}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}