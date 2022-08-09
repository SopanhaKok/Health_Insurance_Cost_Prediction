import { createTheme, Theme } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type LangType = "en" | "kh" | "ch";

type LangObject = {
  key: LangType;
  icon: string;
  label: string;
};

export const languages: Record<string, LangObject> = {
  en: {
    key: "en",
    icon: "/static/flags/en.png",
    label: "English",
  },
  kh: {
    key: "kh",
    icon: "/static/flags/kh.png",
    label: "Khmer",
  },
  ch: {
    key: "ch",
    icon: "/static/flags/ch.png",
    label: "Chinese",
  },
};

interface SettingState {
  themeMode: "light" | "dark";
  lang: LangObject;
}

const initialState: SettingState = {
  themeMode: "light",
  lang: languages.en,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const useSettingsSelector = (): SettingState =>
  useSelector((state: any) => state.settings);

export default settingsSlice.reducer;
