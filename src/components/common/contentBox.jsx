"use client";

import React from "react";
import { Box } from "@mui/joy";
import Titlebar from "@/components/common/titlebar/titlebar";
import { useTheme } from "@mui/material/styles";

const ContentBox = ({ pageName, showExportButton, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        backgroundColor: theme.palette.base,
      }}
    >
      <Titlebar title={pageName} showExportButton={showExportButton} />
      {children}
    </Box>
  );
};

export default ContentBox;
