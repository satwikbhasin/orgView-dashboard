"use client";

import React, { useState } from "react";
import { Box } from "@mui/joy";
import FilterBar from "./filterBar";
import ActionBar from "./conifgurationsBar";
import InventoryTable from "@/components/inventory/inventoryItemsTable";

export default function InventoryTab() {
  const [state, setState] = useState({
    currentPage: 1,
    itemName: "",
    stockStatus: "any",
    category: "any",
    sku: "",
  });

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
      currentPage:
        key === "itemName" ||
        key === "status" ||
        key === "category" ||
        key === "sku"
          ? 1
          : prevState.currentPage,
    }));
  };
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
        <FilterBar
          onItemNameChange={(value) => handleStateChange("itemName", value)}
          onStatusChange={(value) => handleStateChange("status", value)}
          onCategoryChange={(value) => handleStateChange("category", value)}
          onSkuChange={(value) => handleStateChange("sku", value)}
        />
        <ActionBar />
      </Box>
      <Box sx={{ display: "flex", flex: 10, height: "100%" }}>
        <InventoryTable searchFilter={state} />
      </Box>
    </Box>
  );
}
