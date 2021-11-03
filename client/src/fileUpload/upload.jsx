import React, {useState, useEffect} from 'react';
import axios from 'axios';

const upload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  fileSelectedHandler = event => {
    // console.log(event.target.files[0]);
    selectedFile: event.target.files[0];
  };

  fileUploadHandler = () => {
    //send file to firebase
    const formData = new FormData();
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    axios.post('firebase domain', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total);
      }
    });

  };

  return (
    <div className="Upload">
      <input type="file" onChange={this.fileSelectedHandler}/>
      <button onClick={this.fileUploadHandler}>Upload</button>
    </div>
  );
};