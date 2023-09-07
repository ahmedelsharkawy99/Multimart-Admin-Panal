import { db } from "../firebase.config";
import {
  doc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export const getUser = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "users", userEmail);
      const user = await getDoc(docRef);
      resolve(user.data());
    } catch (error) {
      reject(error.message);
    }
  });
};

export const setUser = async (user, imageUrl) => {
  try {
    const docRef = doc(db, "users", user.email);
    await setDoc(docRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoUrl: imageUrl,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUser = (collectionName, id, userRole) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDoc = doc(db, collectionName, id);

      const user = await updateDoc(userDoc, {
        isAdmin: userRole,
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const getOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "orders", id);
      const order = await getDoc(docRef);
      resolve({ ...order.data(), id: order.id });
    } catch (error) {
      reject(error.message);
    }
  });
};

export const setProduct = (product) => {
  return new Promise(async (resolve) => {
    try {
      const docRef = collection(db, "products");

      const doc = await addDoc(docRef, product);

      resolve(doc);
    } catch (error) {
      throw error;
    }
  });
};

export const getCollectionData = (collectionName) => {
  return new Promise(async (resolve) => {
    try {
      const docRef = collection(db, collectionName);

      await onSnapshot(docRef, (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        resolve(data);
      });
    } catch (error) {
      throw error;
    }
  });
};

export const deleteData = (collectionName, id) => {
  return new Promise(async (resolve) => {
    try {
      const docRef = doc(db, collectionName, id);

      const docs = await deleteDoc(docRef);

      resolve(docs);
    } catch (error) {
      throw error;
    }
  });
};

export const updateOrder = (collectionName, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedOrder = doc(db, collectionName, id);

      const order = await updateDoc(updatedOrder, {
        isDelivered: true,
        deliveredAt: serverTimestamp(),
      });

      resolve(order);
    } catch (error) {
      reject(error);
    }
  });
};
