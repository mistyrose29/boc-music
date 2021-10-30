import { v4 as uuid } from 'uuid';
import { storage, db } from './index.js';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { query, where, addDoc, getDocs, collection, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';

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

export const getAllProjects = (owner) => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('owner', '==', owner));
  return getDocs(q);
};

export const getProject = (projectId) => {
  return db.collection('projects')
    .doc(projectId)
    .get();
};

export const deleteProject = (projectId) => {
  return deleteDoc(doc(db, 'projects', projectId));

  //implement deleting all files in folder and folder
  // Create a reference to the file to delete
  // const desertRef = ref(storage, 'images/desert.jpg');

  // // Delete the file
  // deleteObject(desertRef).then(() => {
  //   // File deleted successfully
  // }).catch((error) => {
  //   // Uh-oh, an error occurred!
  // });
};

// Checks Firestore if logged in user exists, if not add
export const createUser = (userData) => {
  const userInfo = {
    name: userData.username,
    email: userData.email,
    userId: userData.userId
  };
  const docRef = doc(db, 'users', userData.userId);
  const docSnap = getDoc(docRef).then(results => {
    if (results.exists()) {
      console.log('Document data:', results.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document! New Record CREATED!');
      setDoc(doc(db, 'users', userData.userId), userInfo);
    }
  });

};