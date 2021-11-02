import React from 'react';
import { useState, useEffect } from 'react';

import Login from './Login.jsx';
import LoginSuccess from './LoginSuccess.jsx';
import firebase from '../../../database/index.js';

export default function Authentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        console.log('🦁 current logged in user info: ', user);
      }
    });
  }, []);

  return (
    <div className="app">
      {/* if user exists in state, render success module*/}
      {user ? <LoginSuccess user={user} /> : <Login />}
    </div>
  );
}
