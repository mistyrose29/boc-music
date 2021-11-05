import React from 'react';
import { Button } from 'react-bootstrap';
import Track from './Track.jsx';
import Upload from './Upload.jsx';
import { getProjectFiles } from '../../../../database/controllers.js';
import { Icon } from '@iconify/react';

const headphones = ['tabler:headphones-off', 'tabler:headphones'];
const trashcan = 'octicon:trash-16';
const eq = 'file-icons:eq';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isPlaying: false,
      tracks: [],
      time: 0
    };

    this.reload = this.reload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.saveTime = this.saveTime.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  saveTime(time) {
    this.setState({
      time: time
    });
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

        // flush out previous tracks and set updated tracks
        this.setState(() => ({
          tracks: []
        }),
        () => {
          this.setState({
            tracks: tracks
          })
        }
        );
      })
      .catch((error) => {
        console.log('Error occured: ', error);
      });
  }

  handlePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  render() {
    return (
      <div className='main-container'>
        <header className='sticky-header' style={{ marginBottom: 0 }}>
          <div className='flex-row center-content'>
            <div className='center-text projects-header'>
              {this.props.title}
            </div>
            <Button
              className='filter-btn'
              variant='primary'
              onClick={this.handlePlay}>
              <Icon icon={this.state.isPlaying ? 'fe:pause' : 'akar-icons:play'} />
            </Button>
          </div>
          <div className='bottom-right'>
            <Upload
              projectId={this.props.projectId}
              reload={this.reload} />
          </div>
        </header>
        <>
          {this.state.tracks.map((track, index) => {
            console.log(index, track.name, track.path)
            return (
              <div
                key={index}>
                <Track
                  key={index}
                  index={index}
                  path={track.path}
                  name={track.name}
                  isPlaying={this.state.isPlaying}
                  reload={this.reload}
                  time={this.state.time}
                  saveTime={this.saveTime} />
              </div>
            );
          })}
        </>
      </div>
    );
  }
}

export default Project;