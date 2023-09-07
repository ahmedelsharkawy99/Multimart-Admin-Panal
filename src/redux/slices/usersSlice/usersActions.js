import { toast } from "react-toastify";

import { usersActions } from "./usersSlice";
import {
  deleteData,
  getCollectionData,
  getUser,
  setUser,
  updateUser,
} from "../../../handlers/firestore";
import { getCurrentUser, login, logout, signup } from "../../../handlers/auth";
import { uploadImage } from "../../../handlers/storage";

export const createUser = (data, setProgress) => {
  return async (dispatch) => {
    try {
      const downloadUrl = await uploadImage(
        `images/${Date.now() + data.displayName}`,
        data.image,
        setProgress
      );
      const user = await signup(data, downloadUrl);
      await setUser({ ...user, isAdmin: data.isAdmin }, downloadUrl);

      dispatch(fetchUsers());
      toast.success("Account Created Successfully");
    } catch (error) {
      throw error;
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const users = await getCollectionData("users");
      dispatch(usersActions.replaceUsers(users));
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const deleteUser = (email) => {
  return async (dispatch) => {
    try {
      await deleteData("users", email);

      dispatch(fetchUsers());

      toast.success("User Delete Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const updateUserRole = (email, userRole) => {
  return async (dispatch) => {
    try {
      await updateUser("users", email, userRole);

      dispatch(fetchUsers());

      toast.success("User Updated Successfully");
    } catch (error) {
      throw error;
    }
  };
};

export const adminLogin = (data) => {
  return async (dispatch) => {
    try {
      const currentUser = await getUser(data.email);
      if (!currentUser.isAdmin) {
        throw new Error("The user have no permissions to login");
      }

      const user = await login(data);
      dispatch(usersActions.setLog(user));
      toast.success(`Welcome back`);
    } catch (error) {
      throw error;
    }
  };
};

export const adminLogout = () => {
  return async (dispatch) => {
    try {
      await logout();
      await dispatch(authState());
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
    } catch (error) {
      toast.error(error.message);
    }
  };
};
