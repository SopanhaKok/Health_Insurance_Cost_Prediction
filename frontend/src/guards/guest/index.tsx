import { Stack } from "@mui/material";
import ThemeModeMenu from "components/ThemeModeMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const GuestGuard = () => {
  return (
    <>
      <Stack sx={{ position: "fixed", right: 10, top: 10 }}>
        <ThemeModeMenu />
      </Stack>
      <Outlet />
    </>
  );
};

export default GuestGuard;
