"use client";

import React, { useState } from "react";
import { Box, Switch, Typography, switchClasses } from "@mui/joy";
import FilterBar from "./filterBar";
import InventoryTable from "./inventoryTable";

const InventoryTab = () => {
  const [isIntelligentOrderingEnabled, setIsIntelligentOrderingEnabled] =
    useState(false);

  const handleSwitchChange = (event) => {
    setIsIntelligentOrderingEnabled(event.target.checked);
  };

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
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Intelligent Ordering</Typography>
        <Switch
          checked={isIntelligentOrderingEnabled}
          onChange={handleSwitchChange}
          sx={{
            "--Switch-thumbSize": "10px",
            "--Switch-trackWidth": "40px",
            "--Switch-trackHeight": "20px",
            "--Switch-trackBackground": "#E13D00",
            "&:hover": {
              "--Switch-trackBackground": "#EE5E52",
            },
            [`&.${switchClasses.checked}`]: {
              "--Switch-trackBackground": "#019992",
              "&:hover": {
                "--Switch-trackBackground": "#5CB176",
              },
            },
          }}
        />
      </Box>
      <InventoryTable />
    </Box>
  );
};

export default InventoryTab;
