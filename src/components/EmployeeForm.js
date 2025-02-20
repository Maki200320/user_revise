import React from "react";

const EmployeeForm = ({ name, setName, handleTimeIn }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter employee name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleTimeIn}>Time In</button>
    </div>
  );
};

export default EmployeeForm;
