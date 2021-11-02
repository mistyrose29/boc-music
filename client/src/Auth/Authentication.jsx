import React from 'react';
import { useState, useEffect } from 'react';
import firebase, { signIn } from '../../../database/index.js';
import { createUser } from '../../../database/controllers.js';

export default function Authentication(props) {
  useEffect(() => {
    signIn();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          username: user.multiFactor.user.displayName,
          email: user.multiFactor.user.email,
          userPhoto: user.multiFactor.user.photoURL,
          userId: user.multiFactor.user.uid
        };

        props.loginLogout(true, userData);
        createUser(userData);
      }
    });
  }, [props]);

  return (
    <div id="firebaseui-auth-container"/>
  );
}
