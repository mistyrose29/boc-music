import { v4 as uuid } from 'uuid';
import { storage, db } from './index.js';
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage';
import { query, where, addDoc, getDocs, collection, doc, deleteDoc, orderBy, startAt, limit, setDoc, getDoc, updateDoc, arrayUnion, deleteField } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
const auth = getAuth();

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
};

// Checks Firestore if logged in user exists, if not add
export const createUser = (userData) => {
  const docRef = doc(db, 'users', userData.userId);
  return getDoc(docRef)
    .then(results => {
      let data = results.data();
      if (data) {
        return data;
      } else {
        setDoc(doc(db, 'users', userData.userId), userData);
        return false;
      }
    });
};

export const getUserData = (userId) => {
  const docRef = doc(db, 'users', userId);
  return getDoc(docRef);
};

export const updateFriendInFriendsList = (updaterId, friendId) => {
  getUserData(friendId)
    .then((userDoc) => {
      const { name, userId, photo } = userDoc.data();
      const docRef = doc(db, 'users', updaterId);
      const friendPath = `friends.${friendId}`;
      return updateDoc(docRef,
        {
          [friendPath]: {
            name: name,
            id: userId,
            photo: photo,
          }
        });
    });
};

export const shareProjectWith = (userId, projectId, friendIds) => {
  friendIds.forEach((friendId) => {
    updateFriendInFriendsList(userId, friendId);
  });

  console.log(friendIds);

  const docRef = doc(db, 'projects', projectId);
  updateDoc(docRef, { sharedWith: friendIds })
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log('error occured: ', err);
      return;
    });
};

export const addFriend = (userId, email) => {
  const conditions = ['email', '==', email];
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where(...conditions));
  getDocs(q)
    .then((users) => {
      users.forEach((user) => {
        let data = user.data();
        if (data) {
          const friendId = data.userId;
          updateFriendInFriendsList(userId, friendId);
        } else {
          return;
        }
      });
    });
};

export const removeFriend = (userId, friendId) => {
  getUserData(userId)
    .then(user => {
      let data = user.data();
      let friends = data.friends;
      delete friends[friendId];

      const cityRef = doc(db, 'users', userId);
      updateDoc(cityRef, {
        friends: friends
      });
    });
};

export const updateEq = (projectId, eq) => {
  const projectRef = doc(db, 'projects', projectId);
  updateDoc(projectRef, {
    eq: eq
  });
};

// Updating a User's profile
export const changeAvatar = (userId, imageUrl) => {
  updateProfile(auth.currentUser, { photoURL: imageUrl })
    .then(() => {
      const userRef = doc(db, 'users', userId);
      updateDoc(userRef, {
        photo: imageUrl
      });
    }).catch((error) => {
      console.log('Error occurred when updating the current user profile', error);
    });
};

export const changeUserDisplayName = (userId, newName) => {
  updateProfile(auth.currentUser, { displayName: newName })
    .then(() => {
      const userRef = doc(db, 'users', userId);
      updateDoc(userRef, {
        name: newName
      });
    }).catch((error) => {
      console.log('Error occurred when updating the current user display name', error);
    });
};