import React from 'react';
import { Button } from 'react-bootstrap';
import Track from './Track.jsx';
import Upload from './Upload.jsx';
import { getProjectFiles, updateEq } from '../../../../database/controllers.js';
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
      wavesurfers: {},
      eq: {}
    };

    this.reload = this.reload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.saveTime = this.saveTime.bind(this);
    this.storeWS = this.storeWS.bind(this);
    this.mix = this.mix.bind(this);
    this.setEq = this.setEq.bind(this);
  }

  componentDidMount() {
    this.reload();
  }

  saveTime(time) {
    this.setState({
      time: time
    });
  }

  setEq(key, values, WS) {
    console.log(key);
    console.log(values);
    let tempEq = {}
    for (name in this.state.eq) {
      tempEq[name] = this.state.eq[name];
    }

    tempEq[key] = values;

    // save changes to db
    updateEq(this.props.projectId, tempEq);

    this.setState({
      eq: tempEq
    }, () => this.storeWS(WS));
    console.log(this.state.wavesurfers)
  }

  storeWS(WS, index) {
    if (index >= 0) {
      let wavesurfers = this.state.wavesurfers
      wavesurfers[index] = WS
      this.setState({
        wavesurfers: wavesurfers
      }, () => { console.log(this.state.wavesurfers) })
    }
  }

  async mix(soundSources) {
    let sources = Object.values(soundSources)

    console.log(sources)
    // display mixing status and disable click
    let mixBtn = document.getElementById('mix-btn')
    mixBtn.disabled = true;
    let mixStatus = document.getElementById('mix-status')
    mixStatus.innerText = 'Mixing and compressing...'

    let maxDuration = 0;
    let maxChannels = 0;

    // Find maximum duration and channels from the sources
    sources.map((src) => {
      const duration = src.backend.buffer.duration
      const channels = src.backend.buffer.numberOfChannels
      if (maxChannels < channels) {
        maxChannels = channels
      }
      if (maxDuration < duration) {
        maxDuration = duration + 1
      }
    })
    // Init offlineAudioContext
    let offlineCtx = new OfflineAudioContext({
      numberOfChannels: maxChannels,
      length: 44100 * maxDuration,
      sampleRate: 44100,
    });
    // Create buffer source, then set its buffer to the AudioBuffer
    sources.map((src) => {
      let source = offlineCtx.createBufferSource();
      source.buffer = src.backend.buffer

      // Create Compressor Node
      let compressor = offlineCtx.createDynamicsCompressor();

      compressor.threshold.setValueAtTime(-5, offlineCtx.currentTime); // set value btw -100 and 0
      compressor.knee.setValueAtTime(15, offlineCtx.currentTime); // set value btw 0 and 40
      compressor.ratio.setValueAtTime(3, offlineCtx.currentTime); // set value btw 1 and 20
      compressor.attack.setValueAtTime(.005, offlineCtx.currentTime); // set value btw 0 and 1
      compressor.release.setValueAtTime(0.15, offlineCtx.currentTime); // set value btw 0 and 1

      // Create Filter Nodes
      let eq = src.backend.filters.map((filter, index) => {
        let eqFilter = offlineCtx.createBiquadFilter();
        eqFilter.type = filter.type;
        eqFilter.gain.value = filter.gain.value;
        eqFilter.Q.value = filter.Q.value;
        eqFilter.frequency.value = filter.frequency.value;
        return eqFilter
      })
      // connect filter nodes to each other
      eq.forEach((filter, index) => {
        if (index === eq.length - 1) {
          filter.connect(compressor)
        } else {
          filter.connect(eq[index + 1])
        }
      })


      // Connect nodes to destination
      source.connect(eq[0])
      compressor.connect(offlineCtx.destination)
      // Play through the audio buffer to process audio
      source.start()
    })
    // Render the processed audio to layer all AudioBuffers to one AudioBuffer (rendered)
    offlineCtx.startRendering().then((rendered) => {
      make_download(rendered, offlineCtx.length)
    })

    // Helper functions
    function make_download(audioBuffer, total_samples) {
      // Set sample length and rate
      let duration = audioBuffer.duration,
        rate = audioBuffer.sampleRate,
        offset = 0;

      // Convert audioBuffer to .wav file and assign URL
      let new_file = URL.createObjectURL(bufferToWave(audioBuffer, total_samples));

      // Set up downloadable link
      let download_link = document.getElementById("download-link");
      download_link.href = new_file;
      let name = "download.wav";
      download_link.innerText = name;
      download_link.download = name;
      // bring back the mix button
      mixStatus.innerText = 'Mix and Download'
      mixBtn.disabled = false;
    }

    // Convert AudioBuffer to a Blob using WAVE representation
    function bufferToWave(audioBuffer, len) {
      let numOfChan = audioBuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;

      // write WAVE header
      setUint32(0x46464952);                         // "RIFF"
      setUint32(length - 8);                         // file length - 8
      setUint32(0x45564157);                         // "WAVE"

      setUint32(0x20746d66);                         // "fmt " chunk
      setUint32(16);                                 // length = 16
      setUint16(1);                                  // PCM (uncompressed)
      setUint16(numOfChan);
      setUint32(audioBuffer.sampleRate);
      setUint32(audioBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
      setUint16(numOfChan * 2);                      // block-align
      setUint16(16);                                 // 16-bit (hardcoded in this demo)

      setUint32(0x61746164);                         // "data" - chunk
      setUint32(length - pos - 4);                   // chunk length

      // write interleaved data
      for (i = 0; i < audioBuffer.numberOfChannels; i++)
        channels.push(audioBuffer.getChannelData(i));

      while (pos < length) {
        for (i = 0; i < numOfChan; i++) {             // interleave channels
          sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
          sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
          view.setInt16(pos, sample, true);          // write 16-bit sample
          pos += 2;
        }
        offset++                                     // next source sample
      }

      // create Blob
      return new Blob([buffer], { type: "audio/wav" });

      function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
      }

      function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
      }
    }
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
                  setEq={this.setEq}
                  initialEq={
                    this.props.eq
                      ? this.props.eq[track.name] || null
                      : null}
                />
              </div>
            );
          })}
        </>
        <div id='download-container'>
          <div id='download'>

            <a id="download-link"></a>
          </div>
        </div>
        <div id='mixing'>
          <div id='mixing-container'>
            <Button id='mix-btn' variant='outline-primary' onClick={() => this.mix(this.state.wavesurfers)}>
              <Icon icon='akar-icons:cloud-download' width='24' />
              <span id='mix-status'>
                Mix and Download
              </span>
            </Button>

          </div>
        </div>
      </div>
    );
  }
}

export default Project;

