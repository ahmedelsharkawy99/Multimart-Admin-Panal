import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Container, Row } from "reactstrap";

import RequireAuth from "../../routers/RequireAuth";
import { createUser } from "../../redux/slices/usersSlice/usersActions";

import UserForm from "../../components/UserForm/UserForm";

const AddUser = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const submitHandler = async (formData) => {
    try {
      await dispatch(createUser(formData, setProgress));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProgress(0);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <UserForm handlerSubmit={submitHandler} progress={progress} />
        </Row>
      </Container>
    </section>
  );
};

export default RequireAuth(AddUser);
