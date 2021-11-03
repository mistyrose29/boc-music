import React from 'react';
import { withRouter } from 'react-router-dom';


const home = (props) => {

  return (
    <div>
      <br/>
      <div className = "row">
      <button className = "col-md-6" onClick={() => {
        props.history.push('/projects');
      }}>
        project
      </button>
      <button className = "col-md-6" onClick={() => {
        props.history.push('/waveform');
      }}>
        waveform
      </button>
      </div>
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