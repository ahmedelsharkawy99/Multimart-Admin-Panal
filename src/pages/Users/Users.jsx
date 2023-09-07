import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import RequireAuth from "../../routers/RequireAuth";
import {
  deleteUser,
  updateUserRole,
} from "../../redux/slices/usersSlice/usersActions";

import CustomTable from "../../components/CustomTable/CustomTable";
import useAuth from "../../hooks/useAuth";
import SwitchBtn from "../../components/UI/Switch/SwitchBtn";

const titles = ["Image", "Usernam", "Email", "Role", "Update Role", "Actions"];
const Users = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>

          <Col lg="12" className="mb-5 text-end">
            <Link to="/users/add-user" className="buy__btn m-0">
              Add User
            </Link>
          </Col>

          <Col lg="12" className="pt-2">
            <CustomTable titles={titles}>
              <CustomTableBody />
            </CustomTable>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const CustomTableBody = () => {
  const users = useSelector((state) => state.users.users);
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const deleteProductHandler = async (email) =>
    await dispatch(deleteUser(email));

  const updateUserRoleHandler = async (user, e) => {
    try {
      await dispatch(updateUserRole(user.email, e.target.checked));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.uid}>
          <td>
            <img src={user.photoUrl} alt={user.displayName} loading="lazy" />
          </td>
          <td>{user.displayName}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? "Admin" : "Customer"}</td>
          <td>
            <SwitchBtn
              user={user}
              currentUser={currentUser}
              updateUserRoleHandler={updateUserRoleHandler}
            />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={deleteProductHandler.bind(null, user.email)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default RequireAuth(Users);
