import { useState } from "react";
import { useDispatch } from "react-redux";

import useForm from "../../../shared/hooks/useForm";
import SessionStorageService from "../../../shared/storage/sessionStorage";
import { adminLogin } from "../../../shared/store/slices/usersSlice/usersActions";

import Hide from "../../../shared/components/Icons/Hide";
import Show from "../../../shared/components/Icons/Show";
import Spinner from "../../../shared/components/Spinner/Spinner";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { formData, isLoading, handleChange, handleSubmit } =
    useForm(initialState);

  const type = visible ? "text" : "password";
  const icon = !visible ? Show : Hide;

  const toggleVisibilty = () => setVisible((prevState) => !prevState);

  const submitHandler = async () => {
    const user = await dispatch(adminLogin(formData));
    SessionStorageService.saveData("multimart_admin", user);
  };

  return (
    <form className="auth__from" onSubmit={handleSubmit(submitHandler)}>
      <CustomInput
        required
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <CustomInput
        required
        id="password"
        type={type}
        icon={icon}
        value={formData.password}
        onChange={handleChange}
        onIconClick={toggleVisibilty}
        containerClass="position-relative"
        placeholder="Enter your password"
      />

      <button className="buy__btn auth__btn" disabled={isLoading}>
        {isLoading ? <Spinner className={"spinner-border-sm"} /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
