import React, { useEffect, useRef, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';

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
  partialRender: true
});

export default function WaveformBasic({ url, isMuted, isPlaying, visible, time, saveTime }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);


  // setup wavesurfer
  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.on('ready', () => {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    wavesurfer.current.on('seek', (float) => {
      saveTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.get

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
    wavesurfer.current.setHeight(75);
  }, [visible]);

  useEffect(() => {
    wavesurfer.current.setCurrentTime(time);
  }, [time]);

  return <div className='waveform' ref={waveformRef} />;
}
