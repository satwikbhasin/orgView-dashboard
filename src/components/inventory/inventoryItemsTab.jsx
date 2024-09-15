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
        height: "85vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          marginLeft: 1,
          marginRight: 1,
          flexDirection: "column",
          gap: 0,
        }}
      >
        <Tooltip title="When enabled, auto-orders items at minimum threshold">
          <IconButton
            sx={{
              // backgroundColor: isIntelligentOrderingEnabled
              //   ? "#ebf5ef"
              //   : "#ebdfe0",
              transition: "background-color 0.5s ease, color 0.5s",
              // "&:hover": {
              //   background: isIntelligentOrderingEnabled
              //     ? "#dae3de"
              //     : "#dbced0",
              // },
              "&:hover": {
                background: "transparent",
              },
              "&:active": {
                background: "transparent",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
              paddingRight: 0,
              paddingBottom: 0,
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
                justifyContent: "flex-start",
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
                <Power strokeWidth={2.8} size={14} color="#019992" />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  transition: "opacity 1s ease",
                  opacity: isIntelligentOrderingEnabled ? 0 : 1,
                }}
              >
                <PowerOff strokeWidth={2.8} size={14} color="#C04000" />
              </Box>
            </Box>
            <Typography
              fontWeight={700}
              sx={{
                color: isIntelligentOrderingEnabled ? "#019992" : "#C04000",
                transition: "color 1s ease",
                fontSize: {
                  xs: 10,
                  sm: 12,
                  md: 14,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {isIntelligentOrderingEnabled
                ? "Intelligent Ordering"
                : "Intelligent Ordering"}
            </Typography>
          </IconButton>
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
        </Tooltip>
        <FilterBar />
      </Box>
      <Box sx={{ display: "flex", flex: 10 }}>
        <InventoryTable />
      </Box>
    </Box>
  );
};

export default InventoryTab;
