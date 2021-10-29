import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
// import EqualizerWindow from './EditAudio/EQ.jsx';
import Projects from './Projects/Projects.jsx';
import './styles/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: false,
    };
  }

  render() {
    if (this.state.testing) {
      return <Projects ownerId={'test'}/>;
    } else {
      return (
        <div>BOC
          <WaveformApp />
          <hr />
          <button onClick={() => this.setState({testing: true})}>View Test User's Projects</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));