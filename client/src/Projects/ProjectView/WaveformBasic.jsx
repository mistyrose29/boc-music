import React, { useEffect, useRef, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor/index.js';
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline/index.js';


const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: '#eee',
  progressColor: 'OrangeRed',
  cursorColor: 'OrangeRed',
  barWidth: 2,
  barRadius: 3,
  responsive: true,
  height: 75,
  normalize: true,
  partialRender: true,
  plugins: [
    // timeline not rendering properly
    TimelinePlugin.create({
      container: '.waveform-timeline',
      primaryColor: 'blue',
      secondaryColor: 'orangered',
      primaryFontColor: 'blue',
      secondaryFontColor: 'orangered',
      fontFamily: 'Arial',
      fontSize: 12
    }),
    CursorPlugin.create({
      showTime: true,
      opacity: 1,
      customStyle: {
        'top': '-16px',
        'height': '107px',
      },
      customShowTimeStyle: {
        'background-color': '#000',
        'color': '#fff',
        'padding': '2px',
        'font-size': '12px'
      }
    })
  ]
});

export default function WaveformBasic({ url, isMuted, isPlaying, visible, time, saveTime, index, storeWS, filterGains }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [filters, setFilters] = useState({});

  const setGain = (index, value) => {
    filters[index].gain.value = value;
  };

  // setup wavesurfer
  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);

    // SETUP EQ
    // EQ filters
    const EQ = [
      { f: 32, type: 'lowshelf' },
      { f: 64, type: 'peaking' },
      { f: 125, type: 'peaking' },
      { f: 250, type: 'peaking' },
      { f: 500, type: 'peaking' },
      { f: 1000, type: 'peaking' },
      { f: 2000, type: 'peaking' },
      { f: 4000, type: 'peaking' },
      { f: 8000, type: 'peaking' },
      { f: 16000, type: 'highshelf' }
    ];

    //create the filters
    let bands = EQ.map(band => {
      let filter = wavesurfer.current.backend.ac.createBiquadFilter();
      filter.type = band.type;
      filter.gain.value = 0;
      filter.Q.value = 1;
      filter.frequency.value = band.f;
      return filter;
    });

    //connect the filter to wavesurfer instance
    wavesurfer.current.backend.setFilters(bands);
    setFilters(bands);
    // END EQ SETUP

    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current) {

        // below 2 lines were blocking getDuration
        // wavesurfer.current.setVolume(volume);
        // setVolume(volume);

        storeWS(wavesurfer.current)
        const total = wavesurfer.current.getDuration().toFixed();
        const totalMinutes = Math.floor(total / 60);
        let totalSeconds = total % 60;
        if ((totalSeconds / 10) < 1) {
          totalSeconds = `0${totalSeconds}`;
        }
        document.getElementById(`time-total${index}`).innerText = ` ${totalMinutes}:${totalSeconds}`;
      }
    });

    wavesurfer.current.on('audioprocess', () => {
      const current = wavesurfer.current.getCurrentTime().toFixed();
      const currentMinutes = Math.floor(current/60);
      let currentSeconds = current % 60;
      if ((currentSeconds / 10) < 1) {
        currentSeconds = `0${currentSeconds}`;
      }
      document.getElementById(`time-current${index}`).innerText = ` ${currentMinutes}:${currentSeconds} `;
    });

    wavesurfer.current.on('seek', (float) => {
      saveTime(wavesurfer.current.getCurrentTime());
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  // handle play / pause
  useEffect(() => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.playPause();
    }
  }, [isPlaying]);

  // handle mute click
  useEffect(() => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.toggleMute();
    }
  }, [isMuted]);

  useEffect(() => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.setHeight(75);
    }
  }, [visible]);

  useEffect(() => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.setCurrentTime(time);
    }
  }, [time]);

  useEffect(() => {
    if (wavesurfer.current.isReady) {
      filterGains.forEach((gainValue, index) => {
        setGain(index, gainValue);
      });
    }
  }, [filterGains]);

  return (
    <div>
      <div className={`waveform track${index}`} ref={waveformRef} />
      <div className={`waveform-timeline track${index}`}></div>
      <div className="timecode">
        <span id={`time-current${index}`} className='time-current'>0:00</span>
        <span> / </span>
        <span id={`time-total${index}`}>0:00</span>
      </div>
    </div>
  );
}
