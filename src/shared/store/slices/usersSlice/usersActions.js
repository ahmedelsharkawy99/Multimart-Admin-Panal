import { toast } from "react-toastify";

import { usersActions } from "./usersSlice";
import {
  deleteData,
  getCollectionData,
  getUser,
  setUser,
  updateUser,
} from "../../../services/handlers/firestore";
import { uploadImage } from "../../../services/handlers/storage";
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from "../../../services/handlers/auth";
import SessionStorageService from "../../../storage/sessionStorage";
import { compressImages } from "../../../utils/helpers";
import { auth } from "../../../services/firebase.config";

export const createUser = (data, setProgress) => {
  return async (dispatch) => {
    const storedUsers = SessionStorageService.getStoredData("multimart_users");
    try {
      const compressedImage = await compressImages(data.image, 80, 80, 0.8);

      const downloadUrl = await uploadImage(
        `images/users/${data.email}/${data.displayName}`,
        compressedImage,
        setProgress
      );

      const user = await signup(data, downloadUrl);

      const newUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoUrl: downloadUrl,
        isAdmin: data.isAdmin,
      };

      await setUser(newUser);
      SessionStorageService.saveData("multimart_users", [
        ...storedUsers,
        { ...newUser },
      ]);

      dispatch(usersActions.replaceUsers([...storedUsers, { ...newUser }]));

      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const users = await getCollectionData("users");
      dispatch(usersActions.replaceUsers(users));
      return users;
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const deleteSelectedUser = (email) => {
  return async (dispatch) => {
    const storedUsers = SessionStorageService.getStoredData("multimart_users");
    const currentUser = SessionStorageService.getStoredData("multimart_admin");
    try {
      await deleteData("users", email);

      if (email === currentUser.email) {
        await auth.currentUser.delete();
        await dispatch(adminLogout());

        toast.success("User Delete Successfully");
        return;
      }

      const updatedUsers = storedUsers.filter((user) => user.email !== email);

      dispatch(usersActions.replaceUsers(updatedUsers));
      SessionStorageService.saveData("multimart_users", updatedUsers);

      toast.success("User Delete Successfully");
    } catch (error) {
      toast.error(error.message);
      dispatch(usersActions.replaceUsers(storedUsers));
      SessionStorageService.saveData("multimart_users", storedUsers);
    }
  };
};

export const updateUserRole = (email, userRole) => {
  return async (dispatch) => {
    const storedUsers = SessionStorageService.getStoredData("multimart_users");

    try {
      const updatedUsers = storedUsers.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            isAdmin: userRole,
          };
        }
        return user;
      });

      dispatch(usersActions.updateUserRole({ email, isAdmin: userRole }));

      SessionStorageService.saveData("multimart_users", updatedUsers);

      await updateUser("users", email, userRole);

      toast.success("User Updated Successfully");
    } catch (error) {
      const updatedUsers = storedUsers.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            isAdmin: !userRole,
          };
        }
        return user;
      });

      toast.error(error.message);
      dispatch(usersActions.updateUserRole({ email, isAdmin: !userRole }));
      SessionStorageService.saveData("multimart_users", updatedUsers);
    }
  };
};

export const adminLogin = (data) => {
  return async (dispatch) => {
    const currentUser = await getUser(data.email);
    if (!currentUser.isAdmin) {
      throw new Error("The user have no permissions to login");
    }

    const user = await login(data);
    dispatch(usersActions.setLog(user));
    toast.success(`Welcome back`);
    return user;
  };
};

export const adminLogout = () => {
  return async (dispatch) => {
    try {
      await logout();
      dispatch(usersActions.setLog(null));
      SessionStorageService.clearStoredData();
      toast.success(`Logged out successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const authState = () => {
  return async (dispatch) => {
    try {
      const user = await getCurrentUser();
      dispatch(usersActions.setLog(user));
      return user;
    } catch (error) {
      toast.error(error.message);
    }
  };
};
