import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import "./styles.css";

const EmployeeTimeTracker = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employeesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEmployees(employeesData);
    };
    fetchEmployees();
  }, []);

  const handleTimeIn = async () => {
    if (!name) return;
    const currentDate = new Date().toLocaleDateString(); // Get current date
    const currentTime = new Date().toLocaleTimeString(); // Get current time

    const docRef = await addDoc(collection(db, "employees"), {
      name,
      date: currentDate,
      timeIn: currentTime,
      timeOut: ""
    });

    setEmployees([...employees, { id: docRef.id, name, date: currentDate, timeIn: currentTime, timeOut: "" }]);
    setName("");
  };

  const handleTimeOut = async (id) => {
    const employeeRef = doc(db, "employees", id);
    await updateDoc(employeeRef, {
      timeOut: new Date().toLocaleTimeString(),
    });
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, timeOut: new Date().toLocaleTimeString() } : emp));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="container">
      <h1>Employee Time Tracker</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleTimeIn} className="btn time-in">Time In</button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.date}</td>
              <td>{emp.timeIn}</td>
              <td>{emp.timeOut || "-"}</td>
              <td>
                {!emp.timeOut && <button onClick={() => handleTimeOut(emp.id)} className="btn time-out">Time Out</button>}
                <button onClick={() => handleDelete(emp.id)} className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <EmployeeTimeTracker />
    </div>
  );
};

export default App;
