import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
//import Layers from './Layering/Layer.jsx';
import LoginSuccess from './Auth/LoginSuccess.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './Waveform/home.jsx';
// import EqualizerWindow from './EditAudio/EQ.jsx';
import Projects from './Projects/Projects.jsx';
import './styles/styles.css';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
import Authentication from './Auth/Authentication.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      testing: false,
      loggedInUser: {},
    };
    this.props = props
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.testing = this.testing.bind(this);
  }

  login() {
    
    this.setState({
      load: true
    })
  }

  logout() {
    this.setState({
      load: false
    })
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

  testing() {
    this.setState({testing: true})
  }



  render() {

      if (this.state.load) {
        return (
          <Router>
            <Switch>
              <Route path="/login">
                <Redirect to={"/home"}/>
              </Route>

              <Route path="/" exact>
                <Redirect to={"/home"}/>
              </Route>

              <Route path="/home">
                <LoginSuccess />
                 <Home history = {history} logout = {this.logout} testing = {this.testing}/>
              </Route>

              <Route path="/projects">
              <Projects
          ownerName={this.state.loggedInUser.username}
          ownerId={this.state.loggedInUser.userId}/>
              </Route>

              <Route path="/waveform">
              <WaveformApp />
              </Route>

              <Route path="/friendslist">

              </Route>

            </Switch>
          </Router>
        )
      } else {
        return (
          <Router>
            <Switch>
            
              <Route path="/login">
                <Authentication goHome = {this.login} history = {history} addUserState={this.addUserState.bind(this)}/>
              </Route>
              <Redirect from="*" to="/login" />
              
            </Switch>
          </Router>
        )
      }  
    } 
  }
  

//   render() {
//     if (this.state.testing) {
//       return (
//         <Projects
//           ownerName={this.state.loggedInUser.username}
//           ownerId={this.state.loggedInUser.userId}/>
//       );
//     } else {
//       return (
//         <div>BOC
//           <WaveformApp />
//           <hr />
//           <button onClick={() => this.setState({testing: true})}>View Test User's Projects</button>
//           <Authentication addUserState={this.addUserState.bind(this)}/>
//         </div>
//       );
//     }
//   }

// };

ReactDOM.render(<App />, document.getElementById('app'));




