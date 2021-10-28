import React from 'react';
import { getFileUrl, deleteFile } from '../../../database/controllers.js';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      wavesurfer: null
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onComponentDidMount() {
    // Load wavesurfer for each
  }

  handlePlay() {
    this.setState({
      playing: !this.state.playing
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
      <div className='track flex-row justify-evenly'>
        <button onClick={this.handlePlay}>
          {this.state.playing ? 'Pause' : 'Play'}
        </button>
        <div>
          {`${this.props.index} ${this.props.name}`}
        </div>
        <div>
          Waveform
        </div>
        <button onClick={this.handleEdit}>
          edit track
        </button>
        <button onClick={this.handleDelete}>
          delete
        </button>
      </div>
    );
  }
}

export default Track;