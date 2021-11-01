import React from 'react';
import { Button } from 'react-bootstrap';
import { createFile } from '../../../../database/controllers.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  // On file select (from the pop up)
  onFileChange(event) {
    if (event.target.files.length === 0) {
      return;
    }

    createFile(event.target.files[0], this.props.projectId)
      .then(() => {
        window.alert('Successfully uploaded file');
        this.props.reload();
      })
      .catch((err) => {
        window.alert('Error occured we could not upload your file');
      });

  }

  // On file upload (click the upload button)
  onFileUpload() {
    document.getElementById('file-upload').click();
  }

  render() {
    return (
      // <div className='upload flex-row'>
      //   <button className="grow" onClick={this.onFileUpload}>Upload!</button>
      // </div>
      <>
        <input style={{display: 'none'}} id='file-upload' type='file' onChange={this.onFileChange}/>
        <Button
          variant="primary"
          onClick={this.onFileUpload}
          style={{
            borderRadius: '100px',
            width: '60px',
            height: '60px',
            fontSize: '30px',
            boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.4)'
          }}>
          ＋
        </Button>
      </>
    );
  }
}

export default Upload;