const ProgressBar = ({ progress, containerClass, ...props }) => {
  return (
    <div className={`form__group ${containerClass}`}>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-label="Animated progress"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
          {...props}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
