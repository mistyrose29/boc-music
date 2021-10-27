import { storage } from './index.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = (file) => {
  const storageRef = ref(storage, file.name);
  return uploadBytes(storageRef, file);
};

export const deleteFile = (filepath) => {
  const storageRef = ref(storage, filepath);
  return deleteObject(storageRef);
};

export const getFileUrl = (filepath) => {
  const storage = getStorage();
  return getDownloadURL(ref(storage, 'images/stars.jpg'));
};