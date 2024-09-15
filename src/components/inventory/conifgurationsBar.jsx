"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/joy";
import { Settings2, Power, PowerOff } from "lucide-react";
import { useMediaQuery } from "@mui/material";

export default function ConfigurationsBar() {
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(true);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const iconSize = isSmallScreen ? 10 : isMediumScreen ? 12 : 13;

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        boxShadow: 3,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ textAlign: "left" }}>
        <IconButton
          sx={{
            fontSize: { xs: 10, sm: 12, md: 14 },
            fontWeight: 700,
            gap: 0.5,
            color: "#1c69fb",
            "&:hover": {
              color: "#1c69fb",
              backgroundColor: "transparent",
            },
            cursor: "default",
          }}
        >
          <Settings2 strokeWidth={3} size={iconSize} />
          Configure
        </IconButton>
      </Box>
      <Box
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          width: "100%",
        }}
      >
        <Tooltip title="When enabled, auto-orders items at minimum threshold">
          <IconButton
          size="small"
            sx={{
              backgroundColor: isIntelligentOrderingEnabled
                ? "#E0F3F1"
                : "#dbd7d7",
              transition: "background-color 0.3s ease, color 0.3s",
              "&:hover": {
                background: isIntelligentOrderingEnabled
                  ? "#D2E6E4"
                  : "#dbced0",
              },
              "&:active": {
                background: isIntelligentOrderingEnabled
                  ? "#d7dbd8"
                  : "#dbd7d7",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
              paddingTop: 0.5,
              paddingBottom: 0.5,
              height: "fit-content",
              width: {
                xs: "40%",
                sm: "100%",
              },
            }}
            onClick={() =>
              setIsIntelligentOrderingEnabled(!isIntelligentOrderingEnabled)
            }
          >
            {isIntelligentOrderingEnabled ? (
              <Power strokeWidth={2.8} size={12} color="#019992" />
            ) : (
              <PowerOff strokeWidth={2.8} size={12} color="#C04000" />
            )}
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#019992" : "#C04000",
                transition: "color 1s ease",
                fontSize: { xs: 8, md: 10, lg: 12 },
              }}
            >
              Intelligent Ordering
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
