"use client";

import React from "react";
import { Box, Typography } from "@mui/joy";
import "boxicons";
import ExportButton from "../titlebar/exportButton";

export default function Titlebar({ title, showExportButton = true }) {
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
            fontWeight: "400",
            fontSize: {
              xs: 20,
              sm: 24,
              md: 28,
            },
            color: "black",
          }}
        >
          {title}
        </Typography>
      </Box>
      {showExportButton && <ExportButton />}
    </Box>
  );
}
