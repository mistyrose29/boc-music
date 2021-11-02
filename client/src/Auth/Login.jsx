import React from 'react';
import { signInWithGoogle } from '../../../database/index.js';

const Login = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};

export default Login;