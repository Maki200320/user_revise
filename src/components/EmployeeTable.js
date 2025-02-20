import React from "react";

const EmployeeTable = ({ employees, handleTimeOut, handleDelete }) => {
  return (
    <table border="1" style={{ marginTop: "20px", width: "100%", textAlign: "center" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => (
          <tr key={index}>
            <td>{emp.name}</td>
            <td>{emp.timeIn}</td>
            <td>{emp.timeOut || "-"}</td>
            <td>
              {!emp.timeOut && <button onClick={() => handleTimeOut(index)}>Time Out</button>}
              <button 
                onClick={() => handleDelete(index)} 
                style={{ marginLeft: "5px", background: "red", color: "white" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
