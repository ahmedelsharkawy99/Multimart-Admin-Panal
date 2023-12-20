import { forwardRef } from "react";
import AdminDetails from "./AdminDetails";
import NavLinks from "./NavLinks";
import Close from "../../../shared/components/Icons/Close";

const Navigation = forwardRef(function Navigation({ toggleAdminMenu }, ref) {
  return (
    <section className="admin__menu p-0" ref={ref}>
      <div className="container">
        <div className="row admin__details">
          <div className="col-sm-2">
            <span onClick={toggleAdminMenu}>
              <Close />
            </span>
          </div>
          <AdminDetails className="col-sm-10" />
        </div>
        <NavLinks />
      </div>
    </section>
  );
});

export default Navigation;
