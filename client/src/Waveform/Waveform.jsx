import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true
});
//need to declare extend here to use it to extend wavesurfer options
let extend =  (dest, ...sources) => {
  sources.forEach(source => {
      Object.keys(source).forEach(key => {
          dest[key] = source[key];
      });
  });
  return dest;
}

export default function Waveform({ url, id, tracks, setSelectedTrack }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // toggle EQ popup on or off

  const [EQToggle, setEQToggle] = useState(false);
  const [EditEQ, setEditEQ] = useState(true)
  const hideEQ = () => {
    setEQToggle(false);
  };
  const showEQ = () => {
    setEQToggle(true);
  };



  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);

        // display total playing time
        const total = wavesurfer.current.getDuration().toFixed();
        const totalMinutes = Math.floor(total / 60)
        let totalSeconds = total % 60
        if ((totalSeconds/10) < 1) {
          totalSeconds = `0${totalSeconds}`
        }
        document.getElementById('time-total').innerText = ` ${totalMinutes}:${totalSeconds}`;

        // update & display current playing time
        wavesurfer.current.on('audioprocess', () => {
          const current = wavesurfer.current.getCurrentTime().toFixed();
          const currentMinutes = Math.floor(current/60)
          let currentSeconds = current % 60
          if ((currentSeconds/10) < 1) {
            currentSeconds = `0${currentSeconds}`
          }
          document.getElementById('time-current').innerText = ` ${currentMinutes}:${currentSeconds} `;
        });
             // handles EQ popup window
  const EQpopup = () => {
    if (EQToggle === false) {
      showEQ();
    } else {
      hideEQ();
    }
    let EQ = [
      {
        f: 32,
        type: 'lowshelf'
      }, {
        f: 64,
        type: 'peaking'
      }, {
        f: 125,
        type: 'peaking'
      }, {
        f: 250,
        type: 'peaking'
      }, {
        f: 500,
        type: 'peaking'
      }, {
        f: 1000,
        type: 'peaking'
      }, {
        f: 2000,
        type: 'peaking'
      }, {
        f: 4000,
        type: 'peaking'
      }, {
        f: 8000,
        type: 'peaking'
      }, {
        f: 16000,
        type: 'highshelf'
      }
    ];
;
    //create the filters
    let filters = EQ.map(band => {
      let filter = wavesurfer.current.backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      console.log('wavesurfer', filter)
      return filter;

    })
    //connect the filter to wavesurfer instance
    wavesurfer.current.backend.setFilters(filters);
    // console.log('wavesurfer backend?', wavesurfer)
    wavesurfer.current.setVolume(0.4);

    //bind filters to vertical range sliders


    filters.forEach(filter => {
      let input = document.createElement('input');
        console.log(
        wavesurfer.current.util
        )
        extend(input, {
          type: 'range',
          min: -40,
          max: 40,
          value: 0,
          title: filter.frequency.value
        });
        input.style.display = 'inline-block';
        input.setAttribute('orient', 'vertical');
        wavesurfer.current.drawer.style(input, {'webkitAppearance': 'slider-vertical',
      width: '1em', height: '2em'});
      let container = document.querySelector('#waveform'); //was #eq-popup
      console.log('container', container)
      //it runs this before #eq-popup actually loads so do this
      if (container) {
        console.log(
          'container exists'
        )
        container.appendChild(input);
      }

      let onChange = (e) => {
        filter.gain.value = e.target.value;

      };
      input.addEventListener('input', onChange);
      input.addEventListener('change', onChange)

    });

    setEQToggle(
    <div id = 'eq-popup'>

      <p>insert EQ controls here</p>
      <button onClick = {hideEQ}>Close</button>

      </div>)

  }
  setEditEQ (<button onClick={() => {
    EQpopup()
  }}>Edit Audio</button>)


      }
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    if (wavesurfer.current.isReady === true) {
      setPlay(!playing);
      wavesurfer.current.playPause();
    }
  };

  const previous = (id) => {
    let prevId = id - 1;
    // loop back to the end of the playlist
    if (tracks[prevId] === undefined) {
      prevId = tracks.length - 1;
    }
    setSelectedTrack(tracks[prevId])
  }

  const next = (id) => {
    let nextId = id + 1;
    // loop back to the start of the playlist
    if (tracks[nextId] === undefined) {
      nextId = 0;
    }
    setSelectedTrack(tracks[nextId])
  }

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
  };

  const mute = () => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.toggleMute();
      // update volume indicator on mute toggle
      let volIndicator = document.getElementById("volume");
      if (wavesurfer.current.isMuted) {
        volIndicator.value = 0;
        setVolume(0);
      } else {
        let prevVol = Math.round(wavesurfer.current.savedVolume * 1000) / 1000
        volIndicator.value = prevVol;
        setVolume(prevVol)
      }
    }
  }

  // handles EQ popup window
  const EQpopup = () => {
    if (EQToggle === false) {
      showEQ();
    } else {
      hideEQ();
    }
    setEQToggle(
    <div id = 'eq-popup'>
      <p>insert EQ controls here</p>
      <button onClick = {hideEQ}>Close</button>

      </div>)

  }

  return (
    <div className="waveform-container">
      <div id="waveform" ref={waveformRef} />
      <div>
        Playing Time
        <span id="time-current" className='time-current'> 0:00 </span> / <span id="time-total">0:00</span>
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <button onClick={() => { previous(id) }}>Previous</button>
        <button onClick={() => { next(id) }}>Next</button>
        <button onClick={mute}>Mute</button>
          {/* Add EQ edit functionality */}
          {EditEQ}
        {/* EQ TOGGLE */}
        {EQToggle}




        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1.0"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">
          {Math.round(volume * 100)}% Volume
        </label>
      </div>
    </div>
  );
}
