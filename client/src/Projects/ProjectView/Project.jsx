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
      time: 0,
      wavesurfers: []
    };

    this.reload = this.reload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.saveTime = this.saveTime.bind(this);
    this.storeWS = this.storeWS.bind(this)
    this.mix = this.mix.bind(this)
  }

  componentDidMount() {
    this.reload();
  }

  saveTime(time) {
    this.setState({
      time: time
    });
  }

  storeWS(WS) {
    let wavesurfers = this.state.wavesurfers
    wavesurfers.push(WS)
    this.setState({
      wavesurfers: wavesurfers
    }, () => console.log(this.state.wavesurfers))
  }

  async mix(soundSources) {
    const audioContext = new AudioContext();

    let maxDuration = 0;
    let maxChannels = 2;

    soundSources.map((src) => {
      const duration = src.getDuration()
      const channels = src.backend.buffer.numberOfChannels
      if (maxChannels < channels) {
        maxChannels = channels
      }
      if (maxDuration < duration) {
        maxDuration = duration + 1
      }
    })
    let offlineCtx = new OfflineAudioContext({
      numberOfChannels: maxChannels,
      length: 48000 * maxDuration,
      sampleRate: 48000
    });
    let mixedAudio = audioContext.createMediaStreamDestination();

    soundSources.map((src) => {
      let source = offlineCtx.createBufferSource();
      source.buffer = src.backend.buffer
      source.connect(offlineCtx.destination)
      source.start()
    })

    offlineCtx.startRendering().then((rend) => {
      let chunks = [];
      let blob;
      let song = audioContext.createBufferSource();
      song.buffer = rend;
      song.connect(mixedAudio)
      song.connect(audioContext.destination)

      const recorder = new MediaRecorder(mixedAudio.stream);
      recorder.start(0)
      song.start(0)

      setTimeout(() => {
        console.log('stopped')
        song.stop()
        recorder.stop()
      }, maxDuration*1000);
      recorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      let btn = document.getElementById('mix')
      btn.disabled = true
      btn.innerHTML = 'Mixing in progress...'

      recorder.onstop = function (event) {
        console.log('finished mixing')
        blob = new Blob(chunks, {
          "type": "audio/ogg; codecs=opus"
        });

        const audioDownload = URL.createObjectURL(blob);
        let description = 'download'

        let downloadLink = document.getElementById('download')
        downloadLink.download = description + "." + blob.type.replace(/.+\/|;.+/g, "");
        downloadLink.href = audioDownload
        downloadLink.innerHTML = downloadLink.download;
        btn.disabled = false
        btn.innerHTML = 'Mix'
      }

    })
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
                  saveTime={this.saveTime}
                  storeWS={this.storeWS}
                />
              </div>
            );
          })}
        </>
        <div id='mixing'></div>
        <button
          id='mix'
          onClick={() => this.mix(this.state.wavesurfers)}
        >
          mix
        </button>
        <a id="download"></a>
      </div>
    );
  }
}

export default Project;