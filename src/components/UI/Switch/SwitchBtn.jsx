import React from "react";
import { FormGroup } from "reactstrap";

import "./switchBtn.css";

const SwitchBtn = ({ user, updateUserRoleHandler, currentUser }) => {
  return (
    <FormGroup className="form__group d-flex align-items-center gap-3">
      <input
        defaultChecked={user.isAdmin}
        value={user.isAdmin}
        type="checkbox"
        className="switch"
        id="isAdmin"
        onChange={updateUserRoleHandler.bind(null, user)}
        disabled={user.email === currentUser.email}
      />
    </FormGroup>
  );
};

export default SwitchBtn;
