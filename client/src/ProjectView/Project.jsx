import React from 'react';
import Track from './Track.jsx';
import Upload from './Upload.jsx';
import { getProjectFiles } from '../../../database/controllers.js';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      tracks: []
    };

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    getProjectFiles(this.props.projectId)
      .then((res) => {
        const tracks = res.items.map((itemRef) => {
          return {
            path: itemRef.fullPath,
            name: itemRef.name
          };
        });

        this.setState({
          tracks: tracks
        });
      })
      .catch((error) => {
        console.log('Error occured: ', error);
      });
  }

  render() {
    return (
      <div className='project flex-column'>
        <h1>Project Selected</h1>
        <Upload
          projectId={this.props.projectId}
          reload={this.reload}/>
        <div className='project-play-pause flex-row justify-evenly'>
          <button className="grow">Play</button>
          <button className="grow">Pause</button>
        </div>
        <div>
          <h2 className='track-list flex-column'>Track List</h2>
          {this.state.tracks.map((track, index) => {
            return (
              <Track
                key={index}
                index={index}
                path={track.path}
                name={track.name}
                reload={this.reload}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Project;