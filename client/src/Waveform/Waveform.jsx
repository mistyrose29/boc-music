import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayList from './PlayList.jsx';
import EQOffcanvas from '../Projects/ProjectView/EQOffcanvas.jsx';
import { Card, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';


const playIcon = 'akar-icons:play';
const pauseIcon = 'fe:pause';
const volumeIcon = ['bx:bxs-volume-full', 'bx:bxs-volume-mute'];
const nextIcon = 'fluent:next-16-filled';
const previousIcon = 'fluent:previous-16-filled';
const headphonesIcon = ['tabler:headphones-off', 'tabler:headphones'];
const eqIcon = 'file-icons:eq';

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: 'white',
  progressColor: '#8E4162',
  cursorColor: 'white',
  barWidth: 2,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true
});

//need to declare extend here to use it to extend wavesurfer options
let extend = (dest, ...sources) => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      dest[key] = source[key];
    });
  });
  return dest;
};

export default function Waveform({ url, id, tracks, selectedTrack, setSelectedTrack, addNewTrack }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [filterObj, setfilterObj] = useState({});
  const [timeTotal, setTimeTotal] = useState('0:00');
  const [timeCurrent, setTimeCurrent] = useState('0:00');
  const [filters, setFilters] = useState({});
  const [filterGains, setFilterGains] = useState(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );


  const resetFilterGains = () => {
    setFilterGains([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const setGain = (index, value) => {
    filters[index].gain.value = value;
  };

  const setGainFilters = (index, gain) => {
    let temp = filterGains.slice();
    temp[index] = gain;
    setFilterGains(temp);
    temp.forEach((tempGain, index) => {
      setGain(index, tempGain);
    });
  };

  useEffect(() => {
    if (isReady) {
      filterGains.forEach((gainValue, index) => {
        setGain(index, gainValue);
      });
    }
  }, [filterGains]);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.on('ready', function() {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        // display total playing time
        const total = wavesurfer.current.getDuration().toFixed();
        const totalMinutes = Math.floor(total / 60);
        let totalSeconds = total % 60;
        if ((totalSeconds / 10) < 1) {
          totalSeconds = `0${totalSeconds}`;
        }
        setTimeTotal(`${totalMinutes}:${totalSeconds}`);

        // update & display current playing time
        wavesurfer.current.on('audioprocess', () => {
          const current = wavesurfer.current.getCurrentTime().toFixed();
          const currentMinutes = Math.floor(current / 60);
          let currentSeconds = current % 60;
          if ((currentSeconds / 10) < 1) {
            currentSeconds = `0${currentSeconds}`;
          }
          setTimeCurrent(`${currentMinutes}:${currentSeconds} `);
        });

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
        let filters = EQ.map(band => {
          let filter = wavesurfer.current.backend.ac.createBiquadFilter();
          filter.type = band.type;
          filter.gain.value = 0;
          filter.Q.value = 1;
          filter.frequency.value = band.f;
          return filter;
        });

        //connect the filter to wavesurfer instance
        wavesurfer.current.backend.setFilters(filters);
        setFilters(filters);
      }
      setIsReady(true);
    });

    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    if (wavesurfer.current.isReady) {
      setPlay(!playing);
      wavesurfer.current.playPause();
    }
  };

  const previous = (id) => {
    let prevId = id - 1;
    if (!tracks[prevId]) {
      prevId = tracks.length - 1;
    }
    setSelectedTrack(tracks[prevId]);
  };

  const next = (id) => {
    let nextId = id + 1;
    if (!tracks[nextId]) {
      nextId = 0;
    }
    setSelectedTrack(tracks[nextId]);
  };

  const onVolumeChange = (event) => {
    const newVolume = + event.target.value;
    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
  };

  const mute = () => {
    if (wavesurfer.current.isReady) {
      wavesurfer.current.toggleMute();
      if (wavesurfer.current.isMuted) {
        setVolume(0);
      } else {
        let prevVol = Math.round(wavesurfer.current.savedVolume * 1000) / 1000;
        setVolume(prevVol);
      }
    }
  };

  return (
    <div style={{
      height: '100vh'
    }}>
      <div className= 'page-title' style={{
        fontSize: '30px',
        margin: '20px',
        textAlign: 'center'
      }}>
        Waveform Demo
      </div>

      <Card
        style={{
          margin: '10px'
        }}>
        <Card.Header
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Button
            style={{
              borderRadius: '100px',
              width: '32px',
              height: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            size='sm'
            variant='primary'
            onClick={handlePlayPause}>
            <Icon icon={playing ? pauseIcon : playIcon}/>
          </Button>
          <div
            style={{
              width: '350px',
              textAlign: 'center'
            }}>
            <span className='time-current'>{timeCurrent}</span> / {timeTotal}
          </div>
          <Button
            size='sm'
            variant='outline-light'
            style={{
              border: 'none'
            }}
            onClick={mute}>
            <Icon icon={volume === 0 ? volumeIcon[1] : volumeIcon[0] }/>
          </Button>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingLeft: '5px'
            }}>
            <input
              type='range'
              id='volume'
              name='volume'
              min='0'
              max='1.0'
              step='.025'
              onChange={onVolumeChange}
              value={volume}/>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='waveform-container'>
            <div id='waveform' ref={waveformRef}/>
          </div>

          <EQOffcanvas
            filterGains={filterGains}
            setFilterGains={setGainFilters}
            resetFilterGains={resetFilterGains}
            name={'demo'}
            setEq={() => {}}/>
        </Card.Body>
        <Card.Footer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Button
              size='sm'
              variant='outline-light'
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => { previous(id); }}>
              <Icon icon={previousIcon}/>
              <div style={{ paddingLeft: '5px'}}>
                Prev
              </div>
            </Button>
            <div
              style={{
                fontSize: '20px',
                padding: '10px'
              }}>
              Play List
            </div>
            <Button
              size='sm'
              variant='outline-light'
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => { next(id); }}>
              <div
                style={{ paddingRight: '5px' }}>
                Next
              </div>
              <Icon icon={nextIcon}/>
            </Button>
          </div>
          <PlayList
            tracks={tracks || []}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack || {}}/>

        </Card.Footer>
      </Card>

    </div>
  );
}
