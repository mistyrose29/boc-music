import { v4 as uuid } from 'uuid';
import { storage, db } from './index.js';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { addDoc, getDoc, collection } from 'firebase/firestore';

// FIRESTORAGE METHODS
export const createFile = (file, filepath) => {
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

// FIREBASE DB METHODS
export const createProject = (data) => {
  const id = uuid();
  return addDoc(collection(db, 'projects'), data);
};

export const getAllProjects = (ownerId) => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('ownerId', '==', ownerId));
  return getDocs(q);
};

export const getProject = (projectId) => {
  return db.collection('projects')
    .doc(projectId)
    .get();
};