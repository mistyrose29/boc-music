import React from 'react';
import Project from './ProjectView/Project.jsx';
import { getAllProjects, createProject, getProject } from '../../../database/controllers.js';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectId: null
    };

    this.loadProject = this.loadProject.bind(this);
  }

  componentDidMount() {
    // get projects
    let projects = [];
    getAllProjects(this.props.ownerId)
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

  loadProject(event) {
    let projectId = event.target.getAttribute('projectid');
    this.setState({
      projectId: projectId
    });
  }

  render() {
    if (this.state.projectId !== null) {
      return (
        <Project projectId={this.state.projectId}/>
      );
    } else {
      return (
        <div className="Home">
          <h1>
            Home
          </h1>
          <button
            onClick={createProject}>
              Create a new project
          </button>
          <h2>
            Your Projects
          </h2>
          {this.state.projects.map((project, index) => {
            return (
              <div key={index}>
                <div>
                  {project.title}
                </div>
                <button
                  projectid={project.id}
                  onClick={this.loadProject}>
                    Open Project
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default Projects;