import React from 'react';
import { getAllProjects, createProject, getProject } from '../../../database/controllers.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }

  componentDidMount() {
    // get projects
    const projects = [];
    this.setState({
      projects: projects
    });
  }

  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <button>Create a new project</button>
        <h2>Your Projects</h2>
        {this.state.projects.map((project, index) => {
          return (
            <div>
              <div>{project.name}</div>
              <button onClick={this.props.openproject}>Open Project</button>
            </div>
          );
        })}
        <button>open project</button>
      </div>
    );
  }
}

export default Home;