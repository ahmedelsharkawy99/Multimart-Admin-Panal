import "./customInput.css";

const CustomInput = ({
  containerClass = "",
  icon,
  onIconClick,
  as = "input",
  label,
  ...props
}) => {
  const FieldAs = as;
  const Icon = icon;
  return (
    <div className={`form__group ${containerClass}`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <FieldAs {...props} />
      {icon && (
        <span className="position-absolute" onClick={onIconClick}>
          <Icon />
        </span>
      )}
    </div>
  );
};

export default CustomInput;
