import React, { useEffect } from 'react';
import { Card, ButtonToolbar, ButtonGroup, Button, useAccordionButton, Accordion } from 'react-bootstrap';
import WaveformBasic from './WaveformBasic.jsx';
import EQOffcanvas from './EQOffcanvas.jsx';
import ConfirmModal from './ConfirmModal.jsx';
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
      display: false,
      filterGains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    this.buildWaveform = this.buildWaveform.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.setFilterGains = this.setFilterGains.bind(this);
    this.resetFilterGains = this.resetFilterGains.bind(this);
  }

  componentDidMount() {
    getFileUrl(this.props.path)
      .then((url) => {
        this.setState({
          url: url,
          filterGains: this.props.initialEq || this.state.filterGains
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
          index={this.props.index}
          url={this.state.url}
          isPlaying={this.props.isPlaying}
          isMuted={this.state.isMuted}
          visible={this.state.display}
          time={this.props.time}
          saveTime={this.props.saveTime} />
      );
    }
  }

  handleMute() {
    this.setState({
      isMuted: !this.state.isMuted
    });
  }

  setFilterGains(index, value) {
    let filterGains = this.state.filterGains.slice();
    filterGains[index] = value;
    this.setState({
      filterGains: filterGains
    });
  }

  resetFilterGains() {
    this.setState({
      filterGains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  }

  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }

  render() {
    return (
      <Card className='no-bottom no-radius' id={`card${this.props.index}`}>
        <Card.Header>
          <ButtonToolbar className='justify-between' aria-label='Toolbar with button groups'>
            <ButtonGroup className='me-2'>
              <Button size='sm' variant='outline-primary' onClick={this.handleMute}>
                <Icon icon={this.state.isMuted ? headphones[0] : headphones[1]} />
              </Button>
              <EQOffcanvas
                filterGains={this.state.filterGains}
                setFilterGains={this.setFilterGains}
                resetFilterGains={this.resetFilterGains}
                name={this.props.name}
                setEq={this.props.setEq}/>
              <Button size='sm' variant='outline-secondary' onClick={this.toggleDisplay}>
                <Icon icon={wav} />
              </Button>
            </ButtonGroup>
            <div className='center-self'>
              {`${this.props.index} ${this.props.name}`}
            </div>
            <ConfirmModal
              deleteTitle='Delete Track'
              deleteText='Are you sure you want to delete this track? You will not be able to recover this track once deleted.'
              cb={deleteFile}
              cbValue={this.props.path}
              reload={this.props.reload}
              outline={true} />
          </ButtonToolbar>
        </Card.Header>
        <Card.Body className={this.props.name} style={{ display: this.state.display ? 'block' : 'none' }}>
          {this.state.url &&
            <WaveformBasic
              index={this.props.index}
              url={this.state.url}
              isPlaying={this.props.isPlaying}
              isMuted={this.state.isMuted}
              visible={this.state.display}
              time={this.props.time}
              saveTime={this.props.saveTime}
              filterGains={this.state.filterGains}
              storeWS={this.props.storeWS}/>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default Track;