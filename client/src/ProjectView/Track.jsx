import React from 'react';
import WaveformBasic from './WaveformBasic.jsx';
import { getFileUrl, deleteFile } from '../../../database/controllers.js';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMuted: false,
      wavesurfer: null,
      url: null
    };

    this.buildWaveform = this.buildWaveform.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    getFileUrl(this.props.path)
      .then((url) => {
        console.log(url);
        this.setState({
          url: url
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buildWaveform() {
    if (this.state.url === null) {
      return <div></div>;
    } else {
      return (
        <WaveformBasic
          url={this.state.url}
          isPlaying={this.props.isPlaying}
          isMuted={this.state.isMuted}/>
      );
    }
  }

  handleMute() {
    this.setState({
      isMuted: !this.state.isMuted
    });
  }

  handleEdit() {
    window.alert('Need to implement');
  }

  handleDelete() {
    deleteFile(this.props.path)
      .then((res) => {
        console.log('File deleted');
        this.props.reload();
      })
      .catch((error) => {
        console.log('Error occured: ', error);
      });
  }

  render() {
    return (
      <div className='track flex-column'>
        <div className='flex-row justify-evenly'>
          <button onClick={this.handleMute}>
            {this.state.isMuted ? 'UnMute' : 'Mute'}
          </button>
          <div>
            {`${this.props.index} ${this.props.name}`}
          </div>
          <button onClick={this.handleEdit}>
            edit track
          </button>
          <button onClick={this.handleDelete}>
            delete
          </button>
        </div>
        <div className="basic-waveform">
          {this.buildWaveform()}
        </div>
      </div>
    );
  }
}

export default Track;