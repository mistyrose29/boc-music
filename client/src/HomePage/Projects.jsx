import React from 'react';
import Filters from './Filters.jsx';
import Search from './ProjectView/Search.jsx';
import CreateProject from '../Projects/CreateProject.jsx';
import ProjectView from '../Projects//ProjectView/ProjectView.jsx';
import Project from '../Projects/ProjectView/Project.jsx';
import { getAllProjects, createProject, getProject } from '../../../database/controllers.js';
import { Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class HomePage extends React.Component {
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
      searchTab: false,
      friendsTab: false,
      friendString: '',
      projectEq: {}
    };

    this.loadProjectList = this.loadProjectList.bind(this);
    this.loadProject = this.loadProject.bind(this);
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.clear = this.clear.bind(this);
    this.setSearchTabTrue = this.setSearchTabTrue.bind(this);
    this.setSearchTabFalse = this.setSearchTabFalse.bind(this);
    this.setFriendsTabTrue = this.setFriendsTabTrue.bind(this);
    this.setFriendsTabFalse = this.setFriendsTabFalse.bind(this);
  }

  componentDidMount() {
    
    
    let friendsString = '';
    for (let i = 0; i < this.props.friends.length; i++) {
      friendsString = friendsString + this.props.friends[i].id
      
                  
    }
    this.setState({
      friendString: friendsString
    })


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
  
  setSearchTabTrue() {
      this.setState({
      searchTab: true
    }) 
    
  }
  setSearchTabFalse() {
      this.setState({
      searchTab: false
    }) 
    
  }

  setFriendsTabTrue() {
    
    this.setState({
      friendsTab: true,
      friendsString: ''
    })
  }
  
  setFriendsTabFalse() {
    this.setState({
      friendsTab: false
    })
  }

  render() {
    if (this.state.projectId !== null) {
      props.history.push('/projectView')
      return (
        <Router>
          <Switch>
            <Route path='/login'>
              <Project
              projectId={this.state.projectId}
              title={this.state.projectTitle}
              owner={this.state.projectOwner}
              eq={this.state.projectEq}/>
            </Route>
          </Switch>
        </Router>
      );
    } else {
      return (
        <div className='main-container'>
          <header className="sticky-header header-shadow">
            <div className='flex-row center-content'>
              <Filters setFilters={this.loadProjectList} setSearchTabTrue = {this.setSearchTabTrue} 
              setSearchTabFalse = {this.setSearchTabFalse} setFriendsTabFalse = {this.setFriendsTabFalse}
              setFriendsTabTrue = {this.setFriendsTabTrue}/>
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
                
            <Search setFilters={this.loadProjectList} searchTab = {this.state.searchTab}/>
          
            {this.state.projects.map((project, index) => {
              if (this.state.friendsTab) {
                if (this.state.friendString.includes(project.owner)) {
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
              }
            } else {

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
            }
            })}
          </>
        </div>
      );
    }
  }
}

export default HomePage;