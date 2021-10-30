import React from 'react';
import CreateProject from './CreateProject.jsx';
import ProjectView from './ProjectView/ProjectView.jsx';
import Project from './ProjectView/Project.jsx';
import { getAllProjects, createProject, getProject } from '../../../database/controllers.js';
import { Nav } from 'react-bootstrap';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectId: null,
      title: '',
      description: '',
      isPublic: false,
    };

    this.loadProjectList = this.loadProjectList.bind(this);
    this.loadProject = this.loadProject.bind(this);
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    this.loadProjectList();
  }

  loadProjectList() {
    // get projects
    let projects = [];
    getAllProjects(this.props.ownerId)
      .then((docs) => {
        docs.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });

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

  create(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  save() {
    const title = this.state.title === '' ? 'Untitled Project' : this.state.title;
    const description = this.state.description === '' ? 'no descripton' : this.state.description;
    const data = {
      title: title,
      description: description,
      public: this.state.isPublic,
      owner: this.props.ownerId,
      createdAt: new Date(),
      sharedWith: []
    };

    createProject(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    this.loadProjectList();
  }

  clear() {
    this.setState({
      title: '',
      description: '',
      isPublic: false,
    });
  }

  render() {
    if (this.state.projectId !== null) {
      return (
        <Project
          projectId={this.state.projectId}/>
      );
    } else {
      return (
        <div className='main-container'>
          <header className="sticky-header">
            <h1 className="center-text projects-header">Projects</h1>
            <div className='bottom-right'>
              <CreateProject
                title={this.state.title}
                description={this.state.description}
                isPublic={this.state.isPublic}
                create={this.create}
                save={this.save}
                clear={this.clear}/>
            </div>
          </header>
          <>
            {this.state.projects.map((project, index) => {
              return (
                <div
                  key={index}
                  style={{ margin: '0 10px 10px 10px'}}>
                  <ProjectView
                    project={project}
                    loadProject={this.loadProject}/>
                </div>
              );
            })}
          </>
        </div>
      );
    }
  }
}

export default Projects;