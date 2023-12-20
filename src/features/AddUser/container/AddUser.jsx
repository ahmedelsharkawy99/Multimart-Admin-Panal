import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";
import RequireAuth from "../../../routes/RequireAuth";
import { initialState } from "../shared/utils/initialState";
import { createUser } from "../../../shared/store/slices/usersSlice/usersActions";

import useForm from "../../../shared/hooks/useForm";
import Spinner from "../../../shared/components/Spinner/Spinner";
import ProgressBar from "../../../shared/components/ProgressBar/ProgressBar";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const AddUser = RequireAuth(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const { formData, isLoading, handleChange, handleSubmit } =
    useForm(initialState);

  const submitHandler = async () => {
    await dispatch(createUser(formData, setProgress));
    setProgress(0);
    navigate("/users");
  };

  return (
    <SectionContainer>
      {progress > 0 && <ProgressBar progress={progress} />}
      <UserForm
        formData={formData}
        handleChange={handleChange}
        handlerSubmit={handleSubmit(submitHandler)}
      >
        <button className="buy__btn" disabled={isLoading}>
          {isLoading ? <Spinner className="spinner-border-sm" /> : "Add User"}
        </button>
      </UserForm>
    </SectionContainer>
  );
});

export default AddUser;
