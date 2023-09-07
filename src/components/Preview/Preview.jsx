const Preview = ({ path }) => {
  return (
    path && (
      <div
        className="rounded p-1 m-5"
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${path}`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center",
        }}
      ></div>
    )
  );
};

export default Preview;
