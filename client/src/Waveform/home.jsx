import React from 'react';
import { withRouter } from 'react-router-dom';

const home = (props) => {

  return (
    <div>
      <button onClick={() => {
        props.logout();
        props.history.push('/login');
      }}>logout</button>
      <br/>
      <button onClick={() => {
        props.testing({testing: true});
        props.history.push('/projects');
      }}>
        project
      </button>
      <button onClick={() => {
        props.history.push('/waveform');
      }}>
        waveform
      </button>
      <br/>
      <h3>Friendslist</h3>
      <div>Friend 1</div>
      <div>Friend 2</div>
      <div>Friend 3</div>
      <button>Add Friend</button>
    </div>
  );
};

export default withRouter(home);