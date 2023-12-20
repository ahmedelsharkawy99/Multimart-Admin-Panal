import { Link } from "react-router-dom";

import RequireAuth from "../../../routes/RequireAuth";
import { USERS_TITLES } from "../shared/utils/usersTitles";

import UsersTableBody from "../components/UsersTableBody";
import CustomTable from "../../../shared/components/CustomTable/CustomTable";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Users = RequireAuth(() => {
  return (
    <SectionContainer>
      <div className="col-lg-12">
        <h4 className="fw-bold">Users</h4>
      </div>

      <div className="col-lg-12 mb-5 text-end">
        <Link to="/users/add-user" className="buy__btn m-0">
          Add User
        </Link>
      </div>

      <div className="col-lg-12 pt-2">
        <CustomTable titles={USERS_TITLES}>
          <UsersTableBody />
        </CustomTable>
      </div>
    </SectionContainer>
  );
});

export default Users;
