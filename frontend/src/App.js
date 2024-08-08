import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./component/studentForm";
import StudentList from "./component/studentList";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/register" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
