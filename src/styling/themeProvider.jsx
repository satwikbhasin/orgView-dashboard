"use client";

import React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./themes";

const InnerThemeProvider = ({ children }) => {
  const { mode } = useColorScheme();

  const theme = React.useMemo(() => {
    return mode === "dark" ? darkTheme : lightTheme;
  }, [mode]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

const ThemeProvider = ({ children }) => {
  return (
    <CssVarsProvider>
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </CssVarsProvider>
  );
};

export default ThemeProvider;
