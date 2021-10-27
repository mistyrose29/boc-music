import { storage } from './index.js';
import { ref, uploadBytes } from 'firebase/storage';

export const uploadFile = (file) => {
  const storageRef = ref(storage, file.name);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    // upload something to firebase
    // then do something else
    console.log(snapshot);
    console.log('Uploaded a blob or file!');
  });
};