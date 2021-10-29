import React from 'react';
import { auth } from '../../../database/index.js';


const LoginSuccess = ({ user }) => {
  return (
    <div>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} alt="userPhoto" />
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};

export default LoginSuccess;