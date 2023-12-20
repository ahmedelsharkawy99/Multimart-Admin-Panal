import { json } from "react-router-dom";

import store from "../../../../shared/store/store";
import { getCurrentUser } from "../../../../shared/services/handlers/auth";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { usersActions } from "../../../../shared/store/slices/usersSlice/usersSlice";

export const rootLoader = async () => {
  try {
    const userSession = SessionStorageService.getStoredData("multimart_admin");

    if (userSession) {
      store.dispatch(usersActions.setLog(userSession));
      return userSession;
    } else if (userSession === "") {
      return null;
    }

    const currentUser = await getCurrentUser();
    store.dispatch(usersActions.setLog(currentUser));
    SessionStorageService.saveData("multimart_admin", currentUser || "");
    return currentUser;
  } catch (error) {
    throw json(
      { message: "Could not fetch user data." },
      {
        status: 500,
      }
    );
  }
};
