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
      urls: []
    };

    this.reload = this.reload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.saveTime = this.saveTime.bind(this);
    this.storeUrl = this.storeUrl.bind(this)
  }

  componentDidMount() {
    this.reload();
  }

  saveTime(time) {
    this.setState({
      time: time
    });
  }

  storeUrl(url) {
    let urls = this.state.urls
    urls.push(url)
    this.setState({
      urls: urls
    }, () => console.log(this.state.urls))
  }

  async mix(sources) {
    const Acontext = new AudioContext();
    console.log(Acontext,'con')

    function BufferLoader(context, urlList, callback) {
      this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }

    BufferLoader.prototype.loadBuffer = function(url, index) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        var loader = this;

        request.onload = function() {
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);
                }
            );
        }

        request.onerror = function() {
            alert('BufferLoader: XHR error');
        }

        request.send();
    }

    BufferLoader.prototype.load = function() {
        for (var i = 0; i < this.urlList.length; ++i)
            this.loadBuffer(this.urlList[i], i);
    }


    function finishedLoading(bufferList) {
      // Create the two buffer sources and play them both together.
      var source1 = context.createBufferSource();
      var source2 = context.createBufferSource();
      var source3 = context.createBufferSource();

      source1.buffer = bufferList[0];
      source2.buffer = bufferList[1];
      source3.buffer = bufferList[2]

      source1.connect(context.destination);
      source2.connect(context.destination);
      source3.connect(context.destination);
      source1.start(0);
      source2.start(0);
      source2.start(0);
    }
    const context = new AudioContext();
    const bufferLoader = new BufferLoader(context, [this.state.urls], finishedLoading);

    bufferLoader.load()

  }

  // async mix(source) {
  //   var sources = source

  //   var description = "mix";
  //   var chunks = [];
  //   var channels = [[0, 1], [1, 0]];
  //   var audio = new AudioContext();
  //   var player = new Audio();
  //   var merger = audio.createChannelMerger(3);
  //   var splitter = audio.createChannelSplitter(2);
  //   var mixedAudio = audio.createMediaStreamDestination();
  //   var duration = 60000;
  //   var context;
  //   var recorder;
  //   var audioDownload;
  //   player.controls = "controls";

  //   function get(src) {
  //     return fetch(src)
  //       .then(function (response) {
  //         return response.arrayBuffer()
  //       })
  //   }

  //   function stopMix(duration, ...media) {
  //     setTimeout(function (media) {
  //       media.forEach(function (node) {
  //         node.stop()
  //       })
  //     }, duration, media)
  //   }

  //   Promise.all(sources.map(get)).then(function (data) {
  //     return Promise.all(data.map(function (buffer, index) {
  //       return audio.decodeAudioData(buffer)
  //         .then(function (bufferSource) {
  //           var channel = channels[index];
  //           console.log(index)
  //           var source = audio.createBufferSource();
  //           source.buffer = bufferSource;
  //           source.connect(merger);
  //           splitter.connect(merger, channel[0], channel[1]);
  //           return source
  //         })
  //     }))
  //       .then(function (audionodes) {
  //         merger.connect(mixedAudio);
  //         merger.connect(audio.destination);
  //         recorder = new MediaRecorder(mixedAudio.stream);
  //         recorder.start(0);
  //         audionodes.forEach(function (node) {
  //           node.start(0)
  //         });

  //         stopMix(duration, ...audionodes, recorder);

  //         recorder.ondataavailable = function (event) {
  //           chunks.push(event.data);
  //         };

  //         recorder.onstop = function (event) {
  //           var blob = new Blob(chunks, {
  //             "type": "audio/mp3; codecs=opus"
  //           });
  //           audioDownload = URL.createObjectURL(blob);
  //           var a = document.createElement("a");
  //           a.download = description + "." + blob.type.replace(/.+\/|;.+/g, "");
  //           a.href = audioDownload;
  //           a.innerHTML = a.download;
  //           player.src = audioDownload;
  //           document.body.appendChild(a);
  //           document.body.appendChild(player);
  //         };
  //       })
  //   })
  //     .catch(function (e) {
  //       console.log('error', e)
  //     });
  // }

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
                  saveTime={this.saveTime}
                  storeUrl={this.storeUrl}
                />
              </div>
            );
          })}
        </>
        <div id='mixing'></div>
        <button
          onClick={() => this.mix(this.state.urls)}
        >
          mix
        </button>
      </div>
    );
  }
}

export default Project;