import React, { useState } from 'react';
import Waveform from './Waveform.jsx';

// const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

const tracks = [
  {
    id: 0,
    title: 'Brahms St Anthony Chorale Theme - Two Pianos',
    url:
      'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
  },
  {
    id: 1,
    title: 'Fraz Schubert Standchen Serenade',
    url:
      'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3'
  }
];

export default function WaveformApp() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  const addNewTrack = function (audioURL) {
    tracks.push({
      id: 1,
      title: 'recorded track',
      url: audioURL
    })

  }

  return (
    <Waveform
      url={selectedTrack.url}
      id={selectedTrack.id}
      tracks={tracks}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      addNewTrack = {addNewTrack}/>
  );
}
