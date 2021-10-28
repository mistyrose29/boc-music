import { storage } from './index.js';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';

export const uploadFile = (file, filepath) => {
  const storageRef = ref(storage, `${filepath}/${file.name}`);
  return uploadBytes(storageRef, file);
};

export const deleteFile = (filepath) => {
  const storageRef = ref(storage, filepath);
  return deleteObject(storageRef);
};

export const getFileUrl = (filepath) => {
  const storageRef = ref(storage, filepath);
  return getDownloadURL(storageRef);
};

export const getProjectFiles = (projectId) => {
  const listRef = ref(storage, projectId);
  return listAll(listRef);
};