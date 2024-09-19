"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/joy";
import { Settings2, Power, PowerOff } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ConfigurationsBar() {
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(true);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const iconSize = isSmallScreen ? 10 : isMediumScreen ? 12 : 14;

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "inherit",
        padding: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          gap: 0.5,
          cursor: "default",
          marginBottom: 1,
        }}
      >
        <Settings2 color={theme.palette.accent} strokeWidth={3} size={iconSize} />
        <Typography
          sx={{
            fontSize: {
              xs: 9,
              sm: 10,
              md: 11,
              xl: 13,
            },
            fontWeight: 800,
            color: theme.palette.text,
          }}
        >
          Configure
        </Typography>
      </Box>
      <Box
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          width: "100%",
        }}
      >
        <Tooltip
          size="sm"
          title="When enabled, auto-orders items at minimum threshold"
        >
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
              padding: 1,
              height: "fit-content",
              width: "fit-content",
            }}
            onClick={() =>
              setIsIntelligentOrderingEnabled(!isIntelligentOrderingEnabled)
            }
          >
            {isIntelligentOrderingEnabled ? (
              <Power strokeWidth={2.5} size={iconSize} color="#019992" />
            ) : (
              <PowerOff strokeWidth={2.5} size={iconSize} color="#C04000" />
            )}
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#019992" : "#C04000",
                transition: "color 1s ease",
                fontSize: { xs: 6, md: 8, lg: 10 },
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
