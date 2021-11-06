import React from 'react';
import { useState } from 'react';
import { Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';

const Filters = ({ setFilters, setSearchTabTrue, setSearchTabFalse, setFriendsTabFalse, setFriendsTabTrue }) => {
  const [key, setKey] = useState('mine');
  const [search, setSearch] = useState('');


  const tabNames = [
    'Global',
    'mine',
    'shared'
  ];


  const handleSearch = () => {
    setFilters({
      key: key,
      query: search
    });
    setSearch('');
    setSearchTabFalse();
  };

  const handleChange = (event) => {
    let term = event.target.value;
    setSearch(term);
  };

  const selectTab = (key) => {
    if (key == 'friends') {
      setFriendsTabTrue()
    } else {
      setFriendsTabFalse()
    }
    if (key == 'search') {
      setSearchTabTrue()
    } else {
      setSearchTabFalse()
    }

    setKey(key);
    if (key == 'Global' || key == 'friends') {
      setFilters({
        key: 'all',
        query: ''
      });
    } else {

      setFilters({
        key: key,
        query: ''
      });
    };
    //setTabText(textOptions[tabNames.indexOf(key)]);
  };

  return (
    <>
          <Tabs
            variant="pills"
            id='controlled-tab-example'
            activeKey={key}
            onSelect={selectTab}
            className='mb-3'>
            <Tab eventKey='Global' title='Global' onClick={handleSearch}></Tab>
            <Tab eventKey='friends' title='Friends' onClick={handleSearch}></Tab>
            <Tab eventKey='mine' title='Mine' onClick={handleSearch}></Tab>
            <Tab eventKey='shared' title='Shared' onClick={handleSearch}></Tab>
            <Tab eventKey='search' title='Search' onClick={handleSearch}></Tab>
          </Tabs>

    </>
  );
};

export default Filters;