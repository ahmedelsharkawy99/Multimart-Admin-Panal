import "../shared/styles/logo.css";
import logo from "../../../assets/images/eco-logo.png";
import Image from "../../../shared/components/Image/Image";

const Logo = ({ headingClassNames }) => {
  return (
    <div className="logo">
      <div className="image">
        <Image src={logo} alt="logo" />
      </div>
      <div>
        <h1 className={headingClassNames || ""}>Multimart</h1>
      </div>
    </div>
  );
};

export default Logo;
