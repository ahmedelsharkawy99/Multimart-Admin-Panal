import "../shared/styles/login.css";

import LoginForm from "../components/LoginForm";
import SectionContainer from "../../../shared/components/SectionContainer/SectionContainer";

const Login = () => {
  return (
    <SectionContainer sectionClass="section my-5">
      <div className="col-lg-6 m-auto text-center">
        <h3 className="fw-bold mb-4">Login</h3>
        <LoginForm />
      </div>
    </SectionContainer>
  );
};

export default Login;
