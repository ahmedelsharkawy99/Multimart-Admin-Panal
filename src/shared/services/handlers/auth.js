import { auth, authSecondry } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getUser } from "./firestore";

export const signup = async (data, imageUrl) => {
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
};

export const login = async (data) => {
  const userCredentail = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredentail.user;
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return resolve(null);
      const userDb = await getUser(user.email);
      if (!userDb.isAdmin)
        throw new Error("User have no permissions to access");
      resolve(user);
    });
  });
};
