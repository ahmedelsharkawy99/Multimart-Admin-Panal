import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "reactstrap";

import "./login.css";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../redux/slices/usersSlice/usersActions";
import { toast } from "react-toastify";
import CustomInput from "../../components/UI/Input/CustomInput";

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const type = visible ? "text" : "password";
  const icon = !visible ? "eye" : "eye-off";

  const changeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  const toggleVisibilty = () => setVisible((prevState) => !prevState);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await dispatch(adminLogin(formData));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row className="my-5">
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Login</h3>
            <Form className="auth__from" onSubmit={submitHandler}>
              <CustomInput
                input={{
                  required: true,
                  id: "email",
                  type: "email",
                  value: formData.email,
                  onChange: changeHandler,
                  placeholder: "Enter your email",
                }}
              />

              <CustomInput
                className="position-relative"
                input={{
                  required: true,
                  id: "password",
                  type: type,
                  value: formData.password,
                  onChange: changeHandler,
                  placeholder: "Enter your password",
                }}
              >
                <span
                  className="position-absolute"
                  onClick={toggleVisibilty}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <i className={`ri-${icon}-line`}></i>
                </span>
              </CustomInput>

              <button className="buy__btn auth__btn" disabled={isLoading}>
                {isLoading ? <Spinner size="sm">Loading...</Spinner> : "Login"}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
