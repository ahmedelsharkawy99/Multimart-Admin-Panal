import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../../shared/hooks/useAuth";
import {
  deleteSelectedUser,
  updateUserRole,
} from "../../../shared/store/slices/usersSlice/usersActions";

import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import Image from "../../../shared/components/Image/Image";

const UsersTableBody = () => {
  const users = useSelector((state) => state.users.users);
  const currentUser = useAuth();
  const dispatch = useDispatch();

  const handleDeleteUser = async (email) => {
    await dispatch(deleteSelectedUser(email));
  };

  const updateUserRoleHandler = async (user, e) => {
    try {
      await dispatch(updateUserRole(user.email, e.target.checked));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.uid}>
          <td>
            <Image src={user.photoUrl} alt={user.displayName} />
          </td>
          <td>{user.displayName}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? "Admin" : "Customer"}</td>
          <td>
            <CustomInput
              containerClass="m-0 d-flex align-items-center gap-3 justify-content-center"
              defaultChecked={user.isAdmin}
              value={user.isAdmin}
              type="checkbox"
              className="switch"
              id="isAdmin"
              onChange={updateUserRoleHandler.bind(null, user)}
              disabled={user.email === currentUser.email}
            />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteUser(user.email)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UsersTableBody;
