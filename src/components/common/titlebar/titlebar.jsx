'use client';

import React from "react";
import { Box, Typography } from "@mui/joy";
import ExportButton from "@/components/common/titlebar/exportButton";
import { useTheme } from "@mui/material/styles";


export default function Titlebar({ title, showExportButton = true }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "default",
        height: "10vh",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: theme.palette.base,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: {
              xs: 20,
              sm: 24,
              md: 28,
            },
            color: theme.palette.text,
          }}
        >
          {title}
        </Typography>
      </Box>
      {showExportButton && <ExportButton />}
    </Box>
  );
}
