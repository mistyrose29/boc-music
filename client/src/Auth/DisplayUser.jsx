import React from 'react';
import { auth } from '../../../database/index.js';

const noUser = 'Anonymous';
const noPhoto = './anonymous.png';

export default function DisplayUser(props) {
  const signOut = () => {
    auth.signOut();
    props.loginLogout(false, null);
  };

  return (
    <div>
      <h1>
        Hello, {props.user.displayName || noUser}
      </h1>
      <img
        src={props.user.photoURL || noPhoto}
        style={{width: '150px', height: '150px'}}
        alt="userPhoto"/>
      <button onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
