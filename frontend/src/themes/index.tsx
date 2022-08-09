import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSettingsSelector } from "redux/slices/setting";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import shape from "./shape";
import typography from "./typography";
import componentsOverride from "./overrides";

export default function AppThemeProvider({ children }) {
  const { themeMode } = useSettingsSelector();
  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shape,
      typography,
      breakpoints,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions as any);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ToastContainer
          position="top-right"
          theme={themeMode}
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={false}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
