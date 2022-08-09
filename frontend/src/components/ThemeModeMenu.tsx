import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { settingsActions, useSettingsSelector } from "redux/slices/setting";

export default function ThemeModeMenu() {
  const { themeMode } = useSettingsSelector();
  const dispatch = useDispatch();

  const toggleThemeMode = () => {
    dispatch(settingsActions.toggleThemeMode());
  };

  return (
    <Tooltip title={themeMode === "light" ? "Dark Mode" : "Light Mode"}>
      <IconButton onClick={toggleThemeMode}>
        {themeMode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
      </IconButton>
    </Tooltip>
  );
}
