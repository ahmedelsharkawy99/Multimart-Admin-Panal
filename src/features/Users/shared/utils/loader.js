import { json, redirect } from "react-router-dom";

import store from "../../../../shared/store/store";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { fetchUsers } from "../../../../shared/store/slices/usersSlice/usersActions";
import { usersActions } from "../../../../shared/store/slices/usersSlice/usersSlice";

export const usersLoader = async () => {
  try {
    const currentUser = SessionStorageService.getStoredData("multimart_admin");

    if (!currentUser) {
      return redirect("/login");
    }

    const storedUsers = SessionStorageService.getStoredData("multimart_users");

    if (!storedUsers) {
      const users = await store.dispatch(fetchUsers());
      SessionStorageService.saveData("multimart_users", users);
      return users;
    }

    store.dispatch(usersActions.replaceUsers(storedUsers));

    return storedUsers;
  } catch (error) {
    throw json(
      { message: "Could not fetch users data." },
      {
        status: 500,
      }
    );
  }
};
