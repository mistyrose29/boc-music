import React from 'react';

const createContext = () => {
  const audioCtx = new AudioContext();

  const drums = new Audio('./sounds/drums.mp3');
  const drumSource = audioCtx.createMediaElementSource(drums);
  const drumGainNode = audioCtx.createGain();
  drumSource.connect(drumGainNode);
  drumGainNode.connect(audioCtx.destination);

  const keys = new Audio('./sounds/keys.mp3');
  const keySource = audioCtx.createMediaElementSource(keys);
  const keyGainNode = audioCtx.createGain();
  keySource.connect(keyGainNode);
  keyGainNode.connect(audioCtx.destination);

  return {
    context: audioCtx,
    sounds: [ drums, keys ],
    sources: [ drumSource, keySource ],
    gains: [ drumGainNode, keyGainNode ],
    mutes: [ false, false ],
    names: [ 'drums', 'keys' ]
  };
};

class Layers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      context: null,
      sounds: null,
      sources: null,
      gains: null,
      mutes: null,
      names: null
    };

    this.handlePlay = this.handlePlay.bind(this);
    this.handleMute = this.handleMute.bind(this);
  }

  handlePlay() {
    if (!this.state.sources) {
      let context = createContext();
      context.playing = true;
      context.sounds.forEach(sound => sound.play());
      this.setState(context);
    } else {
      if (!this.state.playing) {
        this.state.sounds.forEach(sound => sound.play());
      } else {
        this.state.sounds.forEach(sound => sound.pause());
      }

      this.setState({
        playing: !this.state.playing
      });
    }
  }

  handleMute(event) {
    let index = event.target.getAttribute('index');
    let source = this.state.sources[index];
    let gain = this.state.gains[index];
    let mutes = this.state.mutes.slice();

    if (!mutes[index]) {
      gain.gain.setValueAtTime(0, this.state.context.currentTime);
    } else {
      gain.gain.setValueAtTime(1, this.state.context.currentTime);
    }

    mutes[index] = !mutes[index];

    this.setState({
      mutes: mutes
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePlay}>{this.state.playing ? 'Pause' : 'Play'}</button>
        <div>
          {
            this.state.sources === null
              ? <div></div>
              : this.state.sources.map((source, index) => {
                let mute = this.state.mutes[index] ? 'Unmute' : 'Mute';
                return (
                  <div>
                    <button
                      key={index}
                      index={index}
                      onClick={this.handleMute}>
                      {`${mute} ${this.state.names[index]}`}
                    </button>
                  </div>
                );
              })
          }
        </div>
      </div>
    );
  }

}

export default Layers;