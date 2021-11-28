import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import { createFile } from '../../../database/controllers.js';
import { Button, Modal, Form } from 'react-bootstrap';
import { Icon } from '@iconify/react';


const microphone = 'carbon:microphone-filled';

const VoiceRecorder = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    file.name = "Voice Recording"
    createFile(file, props.projectId).then(() => {
      props.reload();
    })
    .catch((err) => {
      console.log(err)
      window.alert('Error occured we could not upload your file');
    });
    handleClose();


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
    <>
    <Button
      variant="primary"
      onClick={handleShow}
      style={{
        borderRadius: '100px',
        width: '60px',
        height: '60px',
        fontSize: '30px',
        boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.4)'
      }}>
      <Icon icon={microphone} />
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default VoiceRecorder;