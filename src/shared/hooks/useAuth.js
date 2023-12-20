import { useSelector } from "react-redux";

const useAuth = () => {
  const currentUser = useSelector((state) => state.users.adminLogin);

  return currentUser;
};

export default useAuth;
