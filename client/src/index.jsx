import React from 'react';
import ReactDOM from 'react-dom';
import Equalizer from './eq-window.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>BOC
        <Equalizer/>


      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));