import React from "react";
import { Outlet } from "react-router-dom";

const AdminGuard = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminGuard;
