const Spinner = ({ className, width, height }) => {
  return (
    <div
      className={`spinner-border ${className}`}
      role="status"
      style={{ width, height }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
