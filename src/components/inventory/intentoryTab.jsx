"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  Switch,
  Tooltip,
  Typography,
  switchClasses,
} from "@mui/joy";
import FilterBar from "./filterBar";
import InventoryTable from "./inventoryTable";
import { Power, PowerOff } from "lucide-react";

const InventoryTab = () => {
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(false);

  return (
    <Box>
      <Box
        sx={{
          height: "fit-content",
          marginBottom: 2,
          display: "flex",
        }}
      >
        <FilterBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          marginBottom: 3,
          height: "2vh",
        }}
      >
        <Tooltip title="Automatically orders items when they reach the minimum threshold">
          {/* <IconButton
            sx={{
              gap: 0.5,
              backgroundColor: isIntelligentOrderingEnabled
                ? "#ebf5ef"
                : "#ebdfe0",
              padding: 1.2,
              transition:
                "background-color 0.5s ease, color 0.5s",
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
              Intelligent Ordering
            </Typography>
          </IconButton> */}
          <IconButton
            sx={{
              gap: 0.5,
              backgroundColor: "black",
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
              Intelligent Ordering
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <InventoryTable />
    </Box>
  );
};

export default InventoryTab;
