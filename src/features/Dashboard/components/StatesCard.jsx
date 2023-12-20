const StatesCard = ({ cardClass, cardTitle, cardNumber }) => {
  return (
    <div className="col-lg-3 mb-3">
      <div className={cardClass}>
        <h2>{cardTitle}</h2>
        <span>{cardNumber}</span>
      </div>
    </div>
  );
};

export default StatesCard;
