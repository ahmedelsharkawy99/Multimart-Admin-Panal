import React from "react";
import { Table } from "reactstrap";

import "./customTable.css";

const CustomTable = ({ titles, children }) => {
  return (
    <Table responsive className="table">
      <CustomTableHead titles={titles} />
      {children}
    </Table>
  );
};

const CustomTableHead = ({ titles }) => {
  return (
    <thead>
      <Tr titles={titles} />
    </thead>
  );
};

const Tr = ({ titles }) => {
  return (
    <tr>
      {titles.map((t, i) => (
        <th key={i}>{t}</th>
      ))}
    </tr>
  );
};

export default CustomTable;
