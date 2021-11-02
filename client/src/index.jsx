import React from 'react';
import ReactDOM from 'react-dom';
import Authentication from './Auth/Authentication.jsx';
import DisplayUser from './Auth/DisplayUser.jsx';
import Home from './Waveform/home.jsx';
import WaveformApp from './Waveform/WaveformApp.jsx';
import Projects from './Projects/Projects.jsx';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles/styles.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      load: false,
    };

    this.loginLogout = this.loginLogout.bind(this);
  }

  loginLogout(loggedIn, loggedInUser) {
    this.setState({
      load: loggedIn,
      loggedInUser: loggedInUser
    });
  }

  render() {
    if (this.state.load) {
      return (
        <Router>
          <Switch>
            <Route path='/login'>
              <Redirect to={'/home'} />
            </Route>

            <Route path='/' exact>
              <Redirect to={'/home'} />
            </Route>

            <Route path='/home'>
              <DisplayUser
                user={{
                  displayName: this.state.loggedInUser.username || null,
                  photoURL: this.state.loggedInUser.userPhoto || null
                }}
                loginLogout={this.loginLogout}
                history={history}/>
              <Home
                history={history}
                loginLogout={this.loginLogout}/>
            </Route>

            <Route path='/projects'>
              <Projects
                ownerName={this.state.loggedInUser.username}
                ownerId={this.state.loggedInUser.userId} />
            </Route>

            <Route path='/waveform'>
              <WaveformApp />
            </Route>

            <Route path='/friends'>

            </Route>

          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>

            <Route path='/login'>
              <Authentication
                loginLogout={this.loginLogout}
                history={history}/>
            </Route>
            <Redirect from='*' to='/login'/>

          </Switch>
        </Router>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));