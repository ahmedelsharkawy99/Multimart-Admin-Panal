import { auth, authSecondry } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getUser } from "./firestore";

export const signup = async (data, imageUrl) => {
  try {
    const userCredentail = await createUserWithEmailAndPassword(
      authSecondry,
      data.email,
      data.password
    );
    const user = userCredentail.user;
    await updateProfile(user, {
      displayName: data.displayName,
      photoURL: imageUrl,
      isAdmin: data.isAdmin,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredentail = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentail.user;
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) return resolve(null);

      const userDb = await getUser(user.email);
      if (!userDb.isAdmin)
        throw new Error("This user have no permissions to access.");

      resolve(user);
    });
  });
};
