import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
import Layers from './Layering/Layer.jsx';
import EqualizerWindow from './EditAudio/EQ.jsx';
import Project from './ProjectView/Project.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: false
    };
  }

  render() {
    if (this.state.testing) {
      return (
        <Project projectId={'test'}/>
      );
    } else {
      return (
        <div>BOC
        <EqualizerWindow/>
        {/*<WaveformApp />*/}
          <hr />
          <button onClick={() => this.setState({testing: true})}>Load Test Project</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));