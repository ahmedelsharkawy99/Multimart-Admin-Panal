import React from "react";
import { FormGroup } from "reactstrap";

import "./customInput.css";

const CustomInput = ({ input, label, className, children }) => {
  const classNames = className ? `form__group ${className}` : "form__group";
  return (
    <FormGroup className={classNames}>
      <label className="mb-2" htmlFor={input.id}>
        {label}
      </label>
      <input {...input} />
      {children}
    </FormGroup>
  );
};

export default CustomInput;
