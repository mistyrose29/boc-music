import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import curveTo from './curveTo.js';

const eq = 'file-icons:eq';
const frequency = ['32', '64', '125', '250', '500', '1K', '2K', '4K', '8K', '16K', ' '];

const EQOffcanvas = ({ filterGains, setFilterGains, resetFilterGains, name, setEq }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEq(name, filterGains);
  };

  const handleShow = () => {
    setShow(true);
    curveTo(filterGains);
  };

  useEffect(() => {
    if (show) {
      curveTo(filterGains);
    }
  }, [show]);

  const handleChange = (event) => {
    const gain = event.target.value;
    const index = parseInt(event.target.getAttribute('title'));
    setFilterGains(index, gain);
  };

  useEffect(() => {
    curveTo(filterGains);
  }, [filterGains]);

  return (
    <>
      <Button
        size='sm'
        variant='outline-light'
        onClick={handleShow}>
        <Icon icon={eq} />
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement='bottom'
        name='bottom'
        style={{
          height: 'fit-content'
        }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Equalizer
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 0
        }}>
          <div style={{
            display: 'flex',
            textAlign: 'center',
            fontSize: 'small',
            fontStyle: 'italic',
            color: 'rgba(256, 256, 256, 0.7)',
            paddingBottom: '5px'
          }}>
            {frequency.map((freq, index) => {
              return <div key={`freq${index}`} style={{ width: '10%'}}>{freq}</div>;
            })}
          </div>
          <div id='eq' style={{ display: 'flex' }}>
            <canvas
              id='eq-draw'
              style={{
                position: 'fixed',
                zIndex: '6',
                backgroundColor: 'rgba(256, 256, 256, 0.1)',
                borderRadius: '10px'
              }}/>
            {filterGains.map((filter, index) => {
              return (
                <input
                  key={`slider${index}`}
                  type='range'
                  style={{ zIndex: '7' }}
                  className='slider'
                  orient='vertical'
                  min={-40}
                  max={40}
                  value={filter}
                  title={index}
                  onChange={handleChange}/>
              );
            })}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: 'x-small',
              fontStyle: 'italic',
              color: 'rgba(256, 256, 256, 0.7)',
              textAlign: 'center',
              flexGrow: 1
            }}>
              <div>40</div>
              <div>0 (dB)</div>
              <div>-40</div>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: '15px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'}}>
            <div>Frequencies (Hz)</div>
            <Button
              size='sm'
              variant='outline-light'
              onClick={resetFilterGains}>
                Reset
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EQOffcanvas;