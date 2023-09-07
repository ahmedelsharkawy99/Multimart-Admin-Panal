import React from "react";
import { Spinner } from "reactstrap";

const LoadingSpinner = ({ size }) => {
  return (
    <div className="text-center my-5">
      <Spinner
        size={size}
        style={{
          height: "3rem",
          width: "3rem",
        }}
      >
        Loading...
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
