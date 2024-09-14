"use client";

import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import FilterBar from "./filterBar";
import InventoryTable from "@/components/inventory/inventoryItemsTable";
import { Power, PowerOff } from "lucide-react";

const InventoryTab = () => {
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        padding: { xs: 0, sm: 1 },
        overflow: "scroll",
        backgroundColor: "#fafafa",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, marginLeft: 1, marginRight: 1 }}>
        <FilterBar />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 0.5,
          marginBottom: 1,
          minHeight: "2vh",
        }}
      >
        <Tooltip title="When enabled, auto-orders items at minimum threshold">
          <IconButton
            sx={{
              gap: 0.5,
              backgroundColor: isIntelligentOrderingEnabled
                ? "#ebf5ef"
                : "#ebdfe0",
              padding: 1,
              transition: "background-color 0.5s ease, color 0.5s",
              "&:hover": {
                background: isIntelligentOrderingEnabled
                  ? "#dae3de"
                  : "#dbced0",
              },
              "&:active": {
                background: isIntelligentOrderingEnabled
                  ? "#d7dbd8"
                  : "#dbd7d7",
              },
            }}
            onClick={() =>
              setIsIntelligentOrderingEnabled(!isIntelligentOrderingEnabled)
            }
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 1s ease",
                  opacity: isIntelligentOrderingEnabled ? 1 : 0,
                }}
              >
                <Power strokeWidth={2.8} size={20} color="#019992" />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 1s ease",
                  opacity: isIntelligentOrderingEnabled ? 0 : 1,
                }}
              >
                <PowerOff strokeWidth={2.8} size={20} color="#C04000" />
              </Box>
            </Box>
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#019992" : "#C04000",
                transition: "color 1s ease",
              }}
            >
              {isIntelligentOrderingEnabled
                ? "Intelligent Ordering Enabled"
                : "Intelligent Ordering Disabled"}
            </Typography>
          </IconButton> */}
      {/* <IconButton
            sx={{
              gap: 0.5,
              backgroundColor: "#222b38",
              padding: 1,              
              "&:hover": {
                background: "black",
              },
              "&:active": {
                background: isIntelligentOrderingEnabled ? "black" : "black",
              },
            }}
            onClick={() =>
              setIsIntelligentOrderingEnabled(!isIntelligentOrderingEnabled)
            }
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 1s ease",
                  opacity: isIntelligentOrderingEnabled ? 1 : 0,
                }}
              >
                <Power strokeWidth={2.8} size={20} color="#019992" />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 1s ease",
                  opacity: isIntelligentOrderingEnabled ? 0 : 1,
                }}
              >
                <PowerOff strokeWidth={2.8} size={20} color="#C04000" />
              </Box>
            </Box>
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#ffffff" : "#808080",
                transition: "color 1s ease",
              }}
            >
              {isIntelligentOrderingEnabled
                ? "Intelligent Ordering Enabled"
                : "Intelligent Ordering Disabled"}
            </Typography>
          </IconButton> */}
      {/* </Tooltip>
      </Box> */}
      <Box sx={{ display: "flex", flex: 10 }}>
        <InventoryTable />
      </Box>
    </Box>
  );
};

export default InventoryTab;
