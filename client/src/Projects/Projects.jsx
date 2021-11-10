import React from 'react';
import Filters from './Filters.jsx';
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
      projectTitle: null,
      projectOwner: null,
      title: '',
      description: '',
      isPublic: false,
      projectEq: {}
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

  loadProjectList(filters) {
    // get projects
    let projects = [];
    getAllProjects(this.props.ownerId, filters)
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
    let index = event.target.getAttribute('index');
    let project = this.state.projects[index];
    this.setState({
      projectId: project.id,
      projectTitle: project.title,
      projectOwner: project.owner,
      projectEq: project.eq
    });
  }

  create(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'isPublic') {
      value = event.target.checked;
    }

    this.setState({
      [name]: value
    });
  }

  save() {
    const title = this.state.title === '' ? 'Untitled Project' : this.state.title;
    const description = this.state.description === '' ? 'no descripton' : this.state.description;
    const data = {
      title: title,
      description: description,
      public: this.state.isPublic,
      ownerName: this.props.ownerName,
      owner: this.props.ownerId,
      createdAt: new Date(),
      sharedWith: []
    };

    createProject(data)
      .then((res) => {
        console.log('project created');
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
          projectId={this.state.projectId}
          title={this.state.projectTitle}
          owner={this.state.projectOwner}
          eq={this.state.projectEq}/>
      );
    } else {
      return (
        <div className='main-container'>
          <header className="sticky-header header-shadow">
            <div className='flex-row center-content'>
              <div className="center-text projects-header">Projects</div>
              <Filters setFilters={this.loadProjectList}/>
            </div>
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
                    index={index}
                    reload={this.loadProjectList}
                    projectId={project.id}
                    project={project}
                    loadProject={this.loadProject}
                    userId={this.props.ownerId}
                    friends={this.props.friends}/>
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