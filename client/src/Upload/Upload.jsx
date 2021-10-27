import React from 'react';
import { uploadFile } from '../../../database/controllers.js';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileData = this.fileData.bind(this);
  }

  // On file select (from the pop up)
  onFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  // On file upload (click the upload button)
  onFileUpload() {
    uploadFile(this.state.selectedFile);

    // reset state to have no file
    this.setState({
      selectedFile: null
    });
  }

  // File content to be displayed after
  // file upload is complete
  fileData() {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h3>
          Upload a file for the project
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default Upload;