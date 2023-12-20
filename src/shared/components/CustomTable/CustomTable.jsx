import "./customTable.css";

const CustomTable = ({ titles, children }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <CustomTableHead titles={titles} />
        {children}
      </table>
    </div>
  );
};

const CustomTableHead = ({ titles }) => {
  return (
    <thead>
      <tr>
        {titles.map((t) => (
          <th key={t}>{t}</th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomTable;
