import Menu from "../../../shared/components/Icons/Menu";
import AdminDetails from "./AdminDetails";
import Logo from "./Logo";

const Header = ({ toggleAdminMenu }) => {
  return (
    <header className="admin__header">
      <div className="admin__nav-top">
        <div className="container">
          <div className="admin__nav-top-wrapper">
            <Logo />

            <AdminDetails className="admin__details-nav__top" />

            <div className="mobile__menu">
              <span onClick={toggleAdminMenu}>
                <Menu />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
