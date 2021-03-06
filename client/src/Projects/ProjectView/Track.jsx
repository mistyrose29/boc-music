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
const distortion = 'fa-solid:wave-square';
const delay = 'gg:sand-clock';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMuted: false,
      wavesurfer: null,
      url: null,
      display: false,
      filterGains: JSON.parse(window.localStorage.getItem(`filterGains${this.props.index}`)) || Array(10).fill(0),
      distort: false,
      delay: false,
    };

    this.buildWaveform = this.buildWaveform.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.setFilterGains = this.setFilterGains.bind(this);
    this.resetFilterGains = this.resetFilterGains.bind(this);
    this.toggleDistort = this.toggleDistort.bind(this);
    this.toggleDelay = this.toggleDelay.bind(this);
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
    }, () => {window.localStorage.setItem(`filterGains${this.props.index}`, JSON.stringify(filterGains))});
  }

  resetFilterGains() {
    this.setState({
      filterGains: Array(10).fill(0)
    });
  }

  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }

  toggleDistort() {
    this.setState({
      distort: !this.state.distort
    });
  }

  toggleDelay() {
    this.setState({
      delay: !this.state.delay
    })
  }

  render() {
    return (
      <Card className='no-bottom no-radius' id={`card${this.props.index}`}>
        <Card.Header>
          <ButtonToolbar className='justify-between' aria-label='Toolbar with button groups'>
            <ButtonGroup className='me-2'>
              <Button
                size='sm'
                variant='outline-light'
                onClick={this.handleMute}>
                <Icon icon={this.state.isMuted ? headphones[0] : headphones[1]} />
              </Button>
              <EQOffcanvas
                filterGains={this.state.filterGains}
                setFilterGains={this.setFilterGains}
                resetFilterGains={this.resetFilterGains}
                name={this.props.name}
                setEq={this.props.setEq}/>
              <Button
                size='sm'
                variant='outline-light'
                onClick={this.toggleDisplay}>
                <Icon icon={wav} />
              </Button>
              <Button
                size='sm'
                variant='outline-light'
                style={
                  this.state.distort
                    ? { backgroundColor: 'rgba(0, 0, 255, 0.3)' }
                    : {}
                }
                onClick={this.toggleDistort}>
                <Icon icon={distortion} />
              </Button>
              {/* <Button
                size='sm'
                variant={this.state.delay ? 'outline-primary' : 'outline-secondary'}
                onClick={this.toggleDelay}
                >
                <Icon icon={delay} />
              </Button> */}
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
        <Card.Body
          className={`${this.props.name} card-coffee`}
          style={{ display: this.state.display ? 'block' : 'none' }}>
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
              storeWS={this.props.storeWS}
              distort={this.state.distort}/>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default Track;