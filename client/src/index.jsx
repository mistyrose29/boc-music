import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
// import EqualizerWindow from './EditAudio/EQ.jsx';
import Project from './ProjectView/Project.jsx';
import Home from './Home/Home.jsx';
import './styles/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: false,
      projectId: null,
    };

    this.loadProject = this.loadProject.bind(this);
  }

  loadProject(event) {
    let projectId = event.target.getAttribute('projectId');
    this.setState({
      projectId: projectId
    });
  }

  render() {
    if (this.state.testing) {
      if (this.state.projectId === null) {
        return <Home loadProject={this.loadProject}/>;
      } else {
        return <Project projectId={this.state.projectId}/>;
      }
    } else {
      return (
        <div>BOC
          <WaveformApp />
          <hr />
          <button onClick={() => this.setState({testing: true})}>Load Test Project</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));