const Preview = ({ path }) => {
  return path ? (
    <>
      <div className="preview__container p-2 rounded">
        <h5 className="mb-3 px-3 pt-3">Preview The uploaded Image</h5>
        <div className="d-flex align-items-center justify-content-center">
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
          />
        </div>
      </div>
    </>
  ) : (
    <p className="p-3 text-secondary fs-4 fw-semibold">No Image Found</p>
  );
};

export default Preview;
