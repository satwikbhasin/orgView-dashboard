"use client";

import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import FilterBar from "./filterBar";
import ActionBar from "./actionsBar";
import InventoryTable from "@/components/inventory/inventoryItemsTable";

const InventoryTab = () => {
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
        <FilterBar />
        <ActionBar />
      </Box>
      <Box sx={{ display: "flex", flex: 10, height: "100%" }}>
        <InventoryTable />
      </Box>
    </Box>
  );
};

export default InventoryTab;
