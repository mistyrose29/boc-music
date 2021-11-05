import React from 'react';
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Icon } from '@iconify/react';

const eq = 'file-icons:eq';
const frequency = ['32', '64', '125', '250', '500', '1K', '2K', '4K', '8K', '16K'];

const EQOffcanvas = ({ filterGains, setFilterGains }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const gain = event.target.value;
    const index = parseInt(event.target.getAttribute('title'));
    setFilterGains(index, gain);
  };

  return (
    <>
      <Button
        size='sm'
        variant='outline-secondary'
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
          <Offcanvas.Title>Equalizer</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
            Frequencies (Hz)
          </div>
          <div style={{ display: 'flex', textAlign: 'center', fontSize: 'small', fontStyle: 'italic', color: 'darkgray', paddingBottom: '5px' }}>
            {frequency.map((freq, index) => {
              return <div key={`freq${index}`} style={{ width: '10%'}}>{freq}</div>;
            })}
          </div>
          <div style={{ display: 'flex' }}>
            {filterGains.map((filter, index) => {
              return (
                <input
                  key={`slider${index}`}
                  type='range'
                  style={{
                    WebkitAppearance: 'slider-vertical',
                    width: '10%'
                  }}
                  className='slider'
                  orient='vertical'
                  min={-40}
                  max={40}
                  value={filter}
                  title={index}
                  onChange={handleChange}/>
              );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EQOffcanvas;