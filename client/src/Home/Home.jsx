import React from 'react';
import { getAllProjects, createProject, getProject } from '../../../database/controllers.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    // get projects
    let projects = [];
    getAllProjects('test')
      .then((docs) => {
        docs.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });

        console.log(projects);

        this.setState({
          projects: projects
        });
      })
      .catch((error) => {
        console.log('Error occured retrieving projects: ', error);
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
            <div key={index}>
              <div>{project.title}</div>
              <button
                projectid={project.id}
                onClick={this.props.loadProject}>
                  Open Project
              </button>
            </div>
          );
        })}
        <button>open project</button>
      </div>
    );
  }
}

export default Home;