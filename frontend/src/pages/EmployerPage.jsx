import React from "react";
import Sidebar from "../components/Sidebar";
import NavbarEmployer from "../components/NavbarEmployer";
const EmployerPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarEmployer />
      <div className="flex flex-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default EmployerPage;
