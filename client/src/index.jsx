import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
import Layers from './Layering/Layer.jsx';
import Upload from './Upload/Upload.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }

  render() {
    return (
      <div>BOC
        <WaveformApp />
        <hr />
        <Layers />
        <hr />
        <Upload />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));