import React from 'react';
import { useState } from 'react';
import { Button, Modal, Tabs, Tab, Form, Card, Dropdown } from 'react-bootstrap';

const Search = ({ setFilters, searchTab }) => {
    const [key, setKey] = useState('mine');
    const [search, setSearch] = useState('');
    const [dropDown, setDropDown] = useState('All')


    const handleSearch = () => {
      let keyFilter = dropDown.toLowerCase()
      setFilters({
        key: keyFilter,
        query: search
      });
    };
  
    const handleChange = (event) => {
      let term = event.target.value;
      setSearch(term);
    };

    const changeDropDown = (event) => {
      setDropDown(event.target.innerText);
    }
  
  if (searchTab) {
    return (
      <div style={{ margin: '0 10px 10px 10px'}}>
      <Card className='card-shadow'>
      <Card.Header>
      </Card.Header>
      <Card.Body>
            <Form>
            <Form.Group className="mb-3-top" controlId="formBasicEmail">
              <Form.Control type="title" placeholder="Search Project Title" onChange={handleChange} />
            </Form.Group>
          </Form>
          <div className = "search-bar-bottom">
          <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" style = {{margin: "0 10px 0 0"}}>
            {dropDown}
          </Dropdown.Toggle>
        <Dropdown.Menu >
          <Dropdown.Item onClick = {changeDropDown}>All</Dropdown.Item>
          <Dropdown.Item onClick = {changeDropDown}>Mine</Dropdown.Item>
          <Dropdown.Item onClick = {changeDropDown}>Friends</Dropdown.Item>
          <Dropdown.Item onClick = {changeDropDown}>Shared</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
          
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          </div>
        </Card.Body>
      </Card>
      </div>
    );
  } else {
    
    return null
  }
  };
  
  export default Search;