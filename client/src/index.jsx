import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
// import EqualizerWindow from './EditAudio/EQ.jsx';
import Projects from './Projects/Projects.jsx';
import './styles/styles.css';
import Authentication from './Auth/Authentication.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: false,
      loggedInUser: {},
    };
  }

  addUserState(userInfo) {
    // console.log('adding user to state')
    if (userInfo.task === 'signin') {
      this.setState({
        loggedInUser: userInfo,
      }, () => {
        console.log('🦊 Current Logged In User Info: ', this.state.loggedInUser);
      });
    } else if (userInfo.task === 'signout') {
      this.setState({
        loggedInUser: {}
      }, () => {
        // console.log(this.state.loggedInUser);
      });
    }
  }

  render() {
    if (this.state.testing) {
      return (
        <Projects
          ownerName={this.state.loggedInUser.username}
          ownerId={this.state.loggedInUser.userId}/>
      );
    } else {
      return (
        <div>BOC
          <WaveformApp />
          <hr />
          <button onClick={() => this.setState({testing: true})}>View Test User's Projects</button>
          <Authentication addUserState={this.addUserState.bind(this)}/>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));