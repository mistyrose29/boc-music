import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
//import Layers from './Layering/Layer.jsx';
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
      testing: false
    };
    this.props = props
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
                 <Home history = {history} logout = {this.logout}/>
              </Route>

              <Route path="/projects">
                <Projects ownerId={'test'}/>
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
                <Authentication />
              </Route>
              <Redirect from="*" to="/login" />
              
            </Switch>
          </Router>
        )
      }   
  }

};

ReactDOM.render(<App />, document.getElementById('app'));

// if (this.state.testing) {
//   return <Projects ownerId={'test'}/>;
// } else {
//   return (
//     <div>BOC
//       <WaveformApp />
//       <hr />
//       <button onClick={() => this.setState({testing: true})}>View Test User's Projects</button>
//       <Authentication />
//     </div>
//   );
// }


