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

export default function Waveform({ url, id, tracks, setSelectedTrack }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);


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

  return (
    <div className="waveform-container">
      <div id="waveform" ref={waveformRef} />
      <div>
        Playing Time
        <span id="time-current"> 0:00 </span> / <span id="time-total">0:00</span>
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <button onClick={() => { previous(id) }}>Previous</button>
        <button onClick={() => { next(id) }}>Next</button>
        <button onClick={mute}>Mute</button>
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
