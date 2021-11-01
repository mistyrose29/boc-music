import React from 'react';
import { Card, ButtonToolbar, ButtonGroup, Button, useAccordionButton, Accordion } from 'react-bootstrap';
import WaveformBasic from './WaveformBasic.jsx';
import { getFileUrl, deleteFile } from '../../../../database/controllers.js';
import { Icon } from '@iconify/react';

const headphones = ['tabler:headphones-off', 'tabler:headphones'];
const trashcan = 'octicon:trash-16';
const eq = 'file-icons:eq';
const wav = 'fluent:device-eq-24-regular';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMuted: false,
      wavesurfer: null,
      url: null,
      display: false
    };

    this.buildWaveform = this.buildWaveform.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
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
          isMuted={this.state.isMuted}
          visible={this.state.display}
          time={this.props.time}
          saveTime={this.props.saveTime}/>
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

  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });

    this.buildWaveform();
  }

  render() {
    return (
      <Card className="no-bottom no-radius">
        <Card.Header>
          <ButtonToolbar className='justify-between' aria-label='Toolbar with button groups'>
            <ButtonGroup className='me-2'>
              <Button size='sm' variant='outline-primary' onClick={this.handleMute}>
                <Icon icon={this.state.isMuted ? headphones[0] : headphones[1]}/>
              </Button>
              <Button size='sm' variant='outline-secondary' onClick={this.handleEdit}>
                <Icon icon={eq}/>
              </Button>
              <Button size='sm' variant='outline-secondary' onClick={this.toggleDisplay}>
                <Icon icon={wav}/>
              </Button>
            </ButtonGroup>
            <div className='center-self'>
              {`${this.props.index} ${this.props.name}`}
            </div>
            <Button size='sm' variant='outline-danger' onClick={this.handleDelete}>
              <Icon icon={trashcan}/>
            </Button>
          </ButtonToolbar>
        </Card.Header>
        <Card.Body style={{ display: this.state.display ? 'block' : 'none' }}>
          {this.buildWaveform()}
        </Card.Body>
      </Card>
    );
  }
}

export default Track;