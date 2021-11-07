import React from 'react';
import ReactDOM from 'react-dom';
import Authentication from './Auth/Authentication.jsx';
import DisplayUser from './Auth/DisplayUser.jsx';
import Home from './Waveform/home.jsx';
import WaveformApp from './Waveform/WaveformApp.jsx';
import Projects from './Projects/Projects.jsx';
import NavPane from './NavPane/NavPane.jsx';
import Profile from './Profile/Profile.jsx';
import Friends from './Friends/Friends.jsx';
import HomePage from './HomePage/Projects.jsx'
import AddFriend from './Share/AddFriend.jsx';
import RemoveFriend from './Share/RemoveFriend.jsx';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getUserData, addFriend, removeFriend as RemoveFriends } from '../../database/controllers.js';
import './styles/styles.css';

import { createFile, getFileUrl, changeAvatar } from '../../database/controllers.js';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      load: false,
      route: null
    };

    this.loginLogout = this.loginLogout.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.reloadUser = this.reloadUser.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
  }

  loginLogout(loggedIn, loggedInUser, cb) {
    this.setState({
      load: loggedIn,
      loggedInUser: loggedInUser
    }, cb);
  }

  addFriend (email) {
    addFriend(this.state.loggedInUser.userId, email);
  }

  removeFriend (id) {
    RemoveFriends(this.state.loggedInUser.userId, id)
   
  }

    //remove this friend from friendslist
  reloadUser() {
    getUserData(this.state.loggedInUser.userId)
      .then((user) => {
        this.setState({
          loggedInUser: user.data()
        });
      });
  }

  changeProfileImage(event) {
    createFile(event.target.files[0], `useravatars/${this.state.loggedInUser.userId}`)
      .then((results) => {
        getFileUrl(results.metadata.fullPath)
          .then((imageUrl) => {
            changeAvatar(this.state.loggedInUser.userId, imageUrl);
            let current = this.state.loggedInUser;
            current.photo = imageUrl;
            this.setState({
              loggedInUser: current
            });
          });
      })
      .catch((error) => {
        console.log('Error in updating the Users profile image', error);
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
              <NavPane
                history={history}
                loginLogout={this.loginLogout}/>
              <DisplayUser
                photo={this.state.loggedInUser.photo || null}
                name={this.state.loggedInUser.name || null}
                history={history}/>
              <Home
                history={history}
                loginLogout={this.loginLogout}
                ownerName={this.state.loggedInUser.username}
                ownerId={this.state.loggedInUser.userId}/>
              <HomePage
                friends={Object.values(this.state.loggedInUser.friends)}
                ownerName={this.state.loggedInUser.name}
                ownerId={this.state.loggedInUser.userId} />
            </Route>

            <Route path='/projects'>
              <NavPane
                history={history}
                loginLogout={this.loginLogout}/>
              <Projects
                friends={Object.values(this.state.loggedInUser.friends)}
                ownerName={this.state.loggedInUser.name}
                ownerId={this.state.loggedInUser.userId} />
            </Route>

            <Route path='/waveform'>
              <NavPane
                history={history}
                loginLogout={this.loginLogout}/>
              <WaveformApp />
            </Route>

            <Route path='/friends'>
              <NavPane
                history={history}
                loginLogout={this.loginLogout}/>
              <Friends
                state={this.state}
                addFriend={this.addFriend}
                removeFriend={this.removeFriend}/>
            </Route>

            <Route path='/profile'>
              <NavPane
                history={history}
                loginLogout={this.loginLogout}/>
              <Profile loginLogout={this.loginLogout}
                changeProfileImage={this.changeProfileImage}
                state={this.state}/>
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