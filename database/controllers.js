import { v4 as uuid } from 'uuid';
import { storage, db } from './index.js';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { query, where, addDoc, getDocs, collection, doc, deleteDoc, orderBy, startAt, limit, setDoc, getDoc } from 'firebase/firestore';

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

export const getAllProjects = (owner, filters) => {
  console.log(filters)
  let primary = ['owner', '==', owner];
  let secondary;


  if (filters) {
    const { key, query } = filters;
    if (key === 'all') {
      primary = ['public', '==', true];
    } else if (key === 'shared') {
      primary = ['sharedWith', 'array-contains', owner];
    } else {
      primary = primary;
    }

    if (query !== '' && query !== null && query !== undefined) {
      secondary = ['title', '==', query];
    }
  }

  const projectsRef = collection(db, 'projects');

  let q;
  if (secondary) {
    console.log(secondary);
    q = query(projectsRef,
      where(...primary),
      where(...secondary),
      orderBy('createdAt', 'desc'),
      limit(5));
  } else {
    q = query(projectsRef,
      where(...primary),
      orderBy('createdAt', 'desc'),
      limit(5));
  }

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
      // console.log('Document data:', results.data());
      // do nothing
    } else {
      // doc.data() will be undefined in this case
      // console.log('No such document! New Record CREATED!');
      // create doc but don't log it
      setDoc(doc(db, 'users', userData.userId), userInfo);
    }
  });

};
