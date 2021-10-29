import React from 'react';
import ReactDOM from 'react-dom';
//import Waveform from './Waveform/Waveform.jsx'
import WaveformApp from './Waveform/WaveformApp.jsx';
import Layers from './Layering/Layer.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false


    };
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({
      load: true
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
                  <button  onClick={() => {
                    this.history.push(`/layers`);
                  }}>layers</button>
                  <button onClick={() => {
                  this.history.push('/waveform');
                }}>waveform</button>
              </Route>
              <Route path="/layers">
                <Layers/>
              </Route>
              <Route path="/waveform">
              <WaveformApp />
              </Route>
            </Switch>
          </Router>
        )
      } else {
        return (
          <Router>
            <Switch>
              <Route path="/">
                <button onClick = {this.login}> login </button>
              </Route>
            </Switch>
          </Router>
        )
      }
      
 
    
  }

};

ReactDOM.render(<App />, document.getElementById('app'));

