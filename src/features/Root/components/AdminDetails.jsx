import { useDispatch } from "react-redux";

import useAuth from "../../../shared/hooks/useAuth";
import { adminLogout } from "../../../shared/store/slices/usersSlice/usersActions";
import Image from "../../../shared/components/Image/Image";

const AdminDetails = ({ className }) => {
  const currentUser = useAuth();
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(adminLogout());
  const classNames = className
    ? `admin__nav-top-right ${className}`
    : "admin__nav-top-right";
  return (
    <div className={classNames}>
      <span>{currentUser.displayName}</span>
      <Image src={currentUser.imageUrl} alt={currentUser.displayName} />
      <button className="btn btn-danger" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default AdminDetails;
