import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

const VoiceRecorder = () => {

  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0
    }
  });

  const handleAudioStop = (data) => {
    console.log(data);
    setAudioDetails(data);
  };

  const handleAudioUpload = (file) => {
    console.log(file);
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setAudioDetails(reset);
  };


  return (

    <Recorder
      record={true}
      title={'New recording'}
      audioURL={audioDetails.url}
      showUIAudio
      handleAudioStop={data => handleAudioStop(data)}
      handleAudioUpload={data => handleAudioUpload(data)}
      handleReset={() => handleReset()}
      mimeTypeToUseWhenRecording={'audio/webm'} // For specific mimetype.
    />
  );
};

export default withRouter(VoiceRecorder);