import React from 'react';
import { useState, useEffect } from 'react';
import firebase, { signIn } from '../../../database/index.js';
import { createUser, getUserData } from '../../../database/controllers.js';

export default function Authentication(props) {
  useEffect(() => {
    signIn();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          userId: user.multiFactor.user.uid,
          email: user.multiFactor.user.email,
          name: user.multiFactor.user.displayName,
          photo: user.multiFactor.user.photoURL,
          friends: {},
        };

        createUser(userData)
          .then((data) => {
            if (data) {
              props.loginLogout(true, data);
            } else {
              props.loginLogout(true, userData);
            }
          });
      }
    });
  }, [props]);

  return (
    <div id="firebaseui-auth-container"/>
  );
}
