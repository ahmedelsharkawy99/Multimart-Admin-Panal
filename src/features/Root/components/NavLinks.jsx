import { NavLink } from "react-router-dom";

import { navbarLinks } from "../shared/utils/narbarLinks";

const NavLinks = () => {
  return (
    <div className="row">
      <nav className="admin__navigation">
        <ul className="admin__menu-list">
          {navbarLinks.map((link) => (
            <li className="admin__menu-item" key={link.display}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavLinks;
