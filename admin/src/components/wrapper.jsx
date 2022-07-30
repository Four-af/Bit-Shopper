import React from "react";
import Sidebar from "./sidebar/Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Wrapper;
