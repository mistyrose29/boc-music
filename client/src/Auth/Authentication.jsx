import React from 'react';
import { useState, useEffect } from 'react';

import Login from './Login.jsx';
import LoginSuccess from './LoginSuccess.jsx';
import firebase from '../../../database/index.js';
import { createUser } from '../../../database/controllers.js';

export default function Authentication(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        // console.log('🦁 current logged in user info: ', user);
        const username = user.multiFactor.user.displayName;
        const email = user.multiFactor.user.email;
        const userPhoto = user.multiFactor.user.photoURL;
        const userId = user.multiFactor.user.uid;
        const userData = {task: 'signin', username: username, email: email, userPhoto: userPhoto, userId: userId};
        props.addUserState(userData);

        createUser(userData);
      }
    });
  }, []);


  return (
    <div id="firebaseui-auth-container">

      {/* if user exists in state, render success module*/}
      {user ? <LoginSuccess user={user} signOut={props} goHome = {props.goHome} history = {props.history}/> : <Login signing={useEffect}/>}
    </div>
  );
}
