import { useState } from "react";
import { Form, FormGroup, Progress, Spinner } from "reactstrap";

import "./userForm.css";

const defaultUser = {
  displayName: "",
  email: "",
  password: "",
  isAdmin: false,
  image: null,
};
const UserForm = ({ user, handlerSubmit, progress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(user || defaultUser);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handlerSubmit(formData);
    setIsLoading(false);
    setFormData(defaultUser);
  };

  const changeHandler = (e) => {
    if (e.target.id === "isAdmin")
      return setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.checked,
      }));

    if (e.target.type === "file") {
      return setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="form__group">
        <label className="mb-2" htmlFor="displayName">
          Username
        </label>
        <input
          type="text"
          placeholder="Test"
          id="displayName"
          value={formData.displayName}
          onChange={changeHandler}
          required
        />
      </FormGroup>
      <FormGroup className="form__group">
        <label className="mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          placeholder="test@test.com"
          id="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />
      </FormGroup>
      <FormGroup className="form__group">
        <label className="mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          placeholder="********"
          id="password"
          value={formData.password}
          onChange={changeHandler}
          required
        />
      </FormGroup>

      <FormGroup className="form__group">
        <label className="mb-2" htmlFor="image">
          User Image
        </label>
        <input type="file" id="image" required onChange={changeHandler} />
      </FormGroup>

      <FormGroup className="form__group d-flex align-items-center gap-3">
        <label htmlFor="isAdmin">Is Admin</label>
        <input
          defaultChecked={formData.isAdmin}
          value={formData.isAdmin}
          type="checkbox"
          className="switch"
          id="isAdmin"
          onChange={changeHandler}
        />
      </FormGroup>

      {isLoading && (
        <FormGroup className="form__group mt-3">
          <Progress animated value={progress}>
            {progress}%
          </Progress>
        </FormGroup>
      )}

      <button className="buy__btn" disabled={isLoading}>
        {isLoading ? <Spinner size="sm">Loading...</Spinner> : "Add User"}
      </button>
    </Form>
  );
};

export default UserForm;
