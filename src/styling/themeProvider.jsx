"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme,
} from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./themes";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";

const InnerThemeProvider = ({ children, initialTheme }) => {
  const { mode, setMode } = useColorScheme();
  const [theme, setTheme] = useState(
    initialTheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setMode(initialTheme);
  }, [setMode, initialTheme]);

  useEffect(() => {
    Cookies.set("themeMode", mode);
    setTheme(mode === "dark" ? darkTheme : lightTheme);
  }, [mode]);

  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", flexDirection: "row" }}>{children}</Box>
    </MaterialThemeProvider>
  );
};

const ThemeProvider = ({ children, initialTheme }) => {
  return (
    <JoyCssVarsProvider>
      <InnerThemeProvider initialTheme={initialTheme}>
        {children}
      </InnerThemeProvider>
    </JoyCssVarsProvider>
  );
};

export default ThemeProvider;
