import "../shared/styles/userForm.css";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";

const UserForm = ({ children, formData, handleChange, handlerSubmit }) => {
  return (
    <form onSubmit={handlerSubmit}>
      <CustomInput
        label="Username"
        id="displayName"
        type="text"
        placeholder="Ahmed Mohammed"
        value={formData.displayName}
        onChange={handleChange}
        required
      />

      <CustomInput
        label="Email"
        id="email"
        type="email"
        placeholder="test"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <CustomInput
        label="Password"
        id="password"
        type="password"
        placeholder="*******"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <CustomInput
        label="User Image"
        id="image"
        type="file"
        onChange={handleChange}
        required
      />

      <CustomInput
        containerClass="m-0 d-flex align-items-center gap-3"
        defaultChecked={formData.isAdmin}
        value={formData.isAdmin}
        type="checkbox"
        className="switch"
        id="isAdmin"
        onChange={handleChange}
      />

      {children}
    </form>
  );
};

export default UserForm;
