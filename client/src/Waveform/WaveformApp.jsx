import React, { useState } from "react";

import Waveform from "./Waveform.jsx";
import PlayList from "./PlayList.jsx";

// const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

const tracks = [
  {
    id: 0,
    title: "Song 1",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3"
  },
  {
    id: 1,
    title: "Song 2",
    url:
      "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"
  }
];

export default function WaveformApp() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);

  return (
    <div className="WaveformApp">
      <Waveform
        url={selectedTrack.url}
        id={selectedTrack.id}
        tracks={tracks}
        setSelectedTrack={setSelectedTrack}
      />
      <PlayList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
      <br />
    </div>
  );
}
