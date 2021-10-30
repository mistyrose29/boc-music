import React from 'react';
import { signIn } from '../../../database/index.js';

const Login = (props) => {

  return (
    <div>
      {/* <div id="loader">Loading...</div> */}
      <button onClick={signIn}>
        Login
      </button>
    </div>
  );
};

export default Login;