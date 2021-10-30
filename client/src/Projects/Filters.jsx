import React from 'react';
import { useState } from 'react';
import { Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';

const Filters = ({ setFilters }) => {
  const [key, setKey] = useState('mine');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [tabText, setTabText] = useState('Projects you\'ve created');

  const textOptions = [
    'All public projects',
    'Projects you\'ve created',
    'Projects shared with you'
  ];

  const tabNames = [
    'all',
    'mine',
    'shared'
  ];

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSearch = () => {
    setShow(false);
    setFilters({
      key: key,
      query: search
    });
    setSearch('');
  };

  const handleChange = (event) => {
    let term = event.target.value;
    setSearch(term);
  };

  const selectTab = (key) => {
    setKey(key);
    setTabText(textOptions[tabNames.indexOf(key)]);
  };

  return (
    <>
      <Button className="filter-btn" variant="primary" checked={'off'} onClick={handleShow}>
        <span className="iconify" data-icon="mdi:filter"></span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* All Mine Yours */}
          <Tabs
            variant="pills"
            id='controlled-tab-example'
            activeKey={key}
            onSelect={selectTab}
            className='mb-3'>
            <Tab eventKey='all' title='All'>{tabText}</Tab>
            <Tab eventKey='mine' title='Mine'>{tabText}</Tab>
            <Tab eventKey='shared' title='Shared'>{tabText}</Tab>
          </Tabs>
          <Form>
            <Form.Group className="mb-3-top" controlId="formBasicEmail">
              <Form.Control type="title" placeholder="Search Project Title" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Filters;