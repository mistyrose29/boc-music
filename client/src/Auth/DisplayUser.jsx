import React from 'react';
import { auth } from '../../../database/index.js';
import { Card, Image } from 'react-bootstrap';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';

export default function DisplayUser(props) {
  return (
    <div>
      <Card className="text-center"  style={{border: 'none'}}>
        <Card.Body id='header-title'>
          <Image
            src={'./musicsharelogo1.png'}
            style={{
              width: '108px',
              top: '10px',
              right: '10px',
              position: 'absolute',
            }}
            fluid
          />
          <br/>
          <Image
            src={props.photo || noPhoto}
            roundedCircle
            alt='user photo'
            style={{
              width: '180px',
              height: '180px'
            }}
            fluid
          />
          <Card.Title>
            <br/>
            {`Hello, ${props.name || noUser}!`}
          </Card.Title>

        </Card.Body>
      </Card>
    </div>
  );
}
