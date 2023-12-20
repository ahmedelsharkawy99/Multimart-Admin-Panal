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
  getAggregateFromServer,
  count,
  sum,
} from "firebase/firestore";

export const getUser = async (userEmail) => {
  const docRef = doc(db, "users", userEmail);
  const user = await getDoc(docRef);
  return user.data();
};

export const setUser = async (user) => {
  const docRef = doc(db, "users", user.email);

  await setDoc(docRef, user);
};

export const updateUser = async (collectionName, id, userRole) => {
  const userDoc = doc(db, collectionName, id);

  const user = await updateDoc(userDoc, {
    isAdmin: userRole,
  });

  return user;
};

export const getOrder = async (id) => {
  const docRef = doc(db, "orders", id);
  const order = await getDoc(docRef);
  return { ...order.data(), id: order.id };
};

export const setProduct = async (product) => {
  const docRef = collection(db, "products");

  const doc = await addDoc(docRef, product);

  return { id: doc.id, ...product };
};

export const updateProductDb = async (id, updatedProduct) => {
  const productRef = doc(db, "products", id);

  const product = await updateDoc(productRef, { ...updatedProduct });

  return product;
};

export const getCollectionData = (collectionName) => {
  return new Promise((resolve, reject) => {
    try {
      const docRef = collection(db, collectionName);

      onSnapshot(docRef, (snapShot) => {
        const data = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteData = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);

  await deleteDoc(docRef);
};

export const updateOrder = async (collectionName, id) => {
  const updatedOrder = doc(db, collectionName, id);

  const order = await updateDoc(updatedOrder, {
    isDelivered: true,
    deliveredAt: serverTimestamp(),
  });

  return order;
};

export const dashboardStatus = async (collectionName) => {
  let aggregateSpec = {
    count: count(),
  };

  if (collectionName === "orders") {
    aggregateSpec = {
      count: count(),
      totalSales: sum("orderDetails.totalAmount"),
    };
  }

  const coll = collection(db, collectionName);
  const snapshot = await getAggregateFromServer(coll, aggregateSpec);

  return snapshot.data();
};
